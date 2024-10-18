import type {NextApiRequest, NextApiResponse} from 'next';
import JSZip from 'jszip';
import xml2js from 'xml2js';
import {parse} from 'date-fns';
import * as turf from '@turf/turf';
import polygons from '@/app/content/polygons.json';
import {gzip} from 'zlib';
import Folder, {KmlData, Marker, Placemark} from "@/app/interfaces/kml";

let cachedKmlData: KmlData = {};  // Cache for KML data
let cachedKmlTimestamp: number = 0;  // Timestamp of when the KML data was last fetched

const KML_TTL = 6 * 60 * 60 * 1000;  // TTL of 6 hours in milliseconds

// Function to fetch and cache KML data with a TTL
const fetchAndCacheKml = async () => {
    const now = Date.now();

    // Check if the cache is still valid
    if (cachedKmlData && (now - cachedKmlTimestamp < KML_TTL)) {
        return cachedKmlData;  // Return cached data if TTL has not expired
    }

    const kmlUrl = 'https://www.google.com/maps/d/u/0/kml?mid=13qY40wMpplijIQHuCr-Jd9o_3x8V8Lo';
    const response = await fetch(kmlUrl);
    if (!response.ok) {
        throw new Error('Failed to fetch ZIP file');
    }

    const blob = await response.arrayBuffer();
    const zip = await JSZip.loadAsync(blob);
    const kmlFile = zip.file("doc.kml");

    if (!kmlFile) {
        throw new Error('KML file not found in ZIP');
    }

    const kmlText = await kmlFile.async("text");

    xml2js.parseString(kmlText, (err, result) => {
        if (err) {
            throw new Error('Failed to parse KML');
        }

        cachedKmlData = result;  // Cache the KML data
        cachedKmlTimestamp = now;  // Update the timestamp to the current time
    });

    return cachedKmlData;
};

// Function to get polygon color based on the count using defined ranges
const getPolygonColor = (count: number): string => {
    if (count === 0) {
        return 'rgba(129,129,129,0.5)';  // Gray for count 0
    }

    // Define colors for each range
    if (count > 1 && count <= 10) {
        return 'rgb(255, 255, 204)';  // Very light yellow
    } else if (count > 10 && count <= 25) {
        return 'rgb(255, 237, 160)';  // Light yellow
    } else if (count > 25 && count <= 75) {
        return 'rgb(251,208,95)';  // Medium yellow
    } else if (count > 75 && count <= 150) {
        return 'rgb(253,173,65)';   // Orange-yellow
    } else if (count > 150 && count <= 300) {
        return 'rgb(255,139,55)';   // Light orange
    } else if (count > 300 && count <= 500) {
        return 'rgb(252, 78, 42)';    // Dark orange
    } else if (count > 500 && count <= 750) {
        return 'rgb(227, 26, 28)';    // Light red
    } else if (count > 750 && count <= 1000) {
        return 'rgb(189, 0, 38)';     // Dark red
    } else if (count > 1000) {
        return 'rgb(128, 0, 38)';     // Very dark red
    }

    return 'rgb(255, 255, 204)';  // Default light yellow if no match (safety fallback)
};

// Rate limiting logic
const requestTimestamps: Record<string, number[]> = {};
const RATE_LIMIT = 1000;
const REQUEST_LIMIT = 1;

// Helper function to gzip and send the response
const sendGzippedResponse = (res: NextApiResponse, data: unknown) => {
    const jsonData = JSON.stringify(data);  // Minify JSON by default
    gzip(jsonData, (err, gzippedData) => {
        if (err) {
            return res.status(500).json({error: 'Failed to compress data'});
        }

        res.setHeader('Content-Encoding', 'gzip');
        res.setHeader('Content-Type', 'application/json');
        res.setHeader('Cache-Control', 'public, max-age=3600');  // Cache the result for an hour
        res.status(200).send(gzippedData);
    });
};

export default async function handler(req: NextApiRequest, res: NextApiResponse) {
    const ip: string = req.headers['x-forwarded-for'] as string;

    if (!requestTimestamps[ip]) {
        requestTimestamps[ip] = [];
    }

    const now = Date.now();
    requestTimestamps[ip] = requestTimestamps[ip].filter(timestamp => now - timestamp < RATE_LIMIT);

    if (requestTimestamps[ip].length >= REQUEST_LIMIT) {
        return res.status(429).json({error: 'Too many requests, please try again later.'});
    }

    requestTimestamps[ip].push(now);

    try {
        const kmlData = await fetchAndCacheKml();  // Fetch and cache KML

        const markers: Marker[] = [];
        const folder = kmlData.kml?.Document[0].Folder.find((f: Folder) => f.name[0] === "Israeli Strikes");

        if (folder && folder.Placemark) {
            folder.Placemark.forEach((placemark: Placemark) => {
                const dateStr = placemark.name[0].split(" - ")[0];
                const date = parse(dateStr, 'M/dd/yy', new Date());

                const coords = placemark.Point[0].coordinates[0].split(",");
                markers.push({
                    title: placemark.name[0],
                    position: {
                        lat: parseFloat(coords[1]),
                        lng: parseFloat(coords[0]),
                    },
                    date
                });
            });
        }

        // Process the polygons from polygons.json
        const updatedPolygons = polygons.features.map(polygon => {
            const polygonShape = turf.multiPolygon(polygon.geometry.coordinates);
            let count = 0;

            // Count markers inside the polygon
            markers.forEach(marker => {
                const markerPoint = turf.point([marker.position.lng, marker.position.lat]);
                if (turf.booleanPointInPolygon(markerPoint, polygonShape)) {
                    count++;
                }
            });

            // Assign a color based on count
            const color = getPolygonColor(count);

            // Add count and color to polygon properties
            return {
                ...polygon,
                properties: {
                    ...polygon.properties,
                    count,
                    color
                }
            };
        });

        // Minify and Gzip the response
        sendGzippedResponse(res, updatedPolygons);
    } catch (error: unknown) {
        res.status(500).json({error: 'Failed to fetch KML: ' + error});
    }
}
