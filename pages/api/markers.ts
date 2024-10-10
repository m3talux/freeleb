import type {NextApiRequest, NextApiResponse} from "next";
import JSZip from 'jszip';
import xml2js from 'xml2js';

// Simple in-memory store for rate limiting
const requestTimestamps: Record<string, number[]> = {};
const RATE_LIMIT = 1000; // 1 second in milliseconds
const REQUEST_LIMIT = 1;  // 1 request per second

export default async function handler(req: NextApiRequest, res: NextApiResponse) {
    const ip: string = req.headers['x-forwarded-for'] as string;
    console.log(ip)

    // Initialize the timestamps array for this IP if it doesn't exist
    if (!requestTimestamps[ip]) {
        requestTimestamps[ip] = [];
    }

    const now = Date.now();

    // Remove timestamps older than the rate limit window
    requestTimestamps[ip] = requestTimestamps[ip].filter(timestamp => now - timestamp < RATE_LIMIT);

    // Check if the request limit has been reached
    if (requestTimestamps[ip].length >= REQUEST_LIMIT) {
        return res.status(429).json({ error: 'Too many requests, please try again later.' });
    }

    // Record the current request's timestamp
    requestTimestamps[ip].push(now);

    const kmlUrl = 'https://www.google.com/maps/d/u/0/kml?mid=13qY40wMpplijIQHuCr-Jd9o_3x8V8Lo';

    try {
        const response = await fetch(kmlUrl);
        if (!response.ok) {
            return res.status(response.status).json({ error: 'Failed to fetch ZIP file' });
        }

        const blob = await response.arrayBuffer();
        const zip = await JSZip.loadAsync(blob);
        const kmlFile = zip.file("doc.kml");
        if (!kmlFile) {
            return res.status(404).json({error: 'KML file not found in ZIP'});
        }

        const kmlText = await kmlFile.async("text");

        xml2js.parseString(kmlText, (err, result) => {
            if (err) {
                console.error("Error parsing KML:", err);
                return res.status(500).json({ error: 'Failed to parse KML' });
            }

            const markers: { title: string; position: { lat: number; lng: number } }[] = [];
            const folder = result.kml.Document[0].Folder.find(f => f.name[0] === "Israeli Strikes");

            if (folder && folder.Placemark) {
                folder.Placemark.forEach(placemark => {
                    const coords = placemark.Point[0].coordinates[0].split(",");
                    markers.push({
                        title: placemark.name[0],
                        position: {
                            lat: parseFloat(coords[1]),
                            lng: parseFloat(coords[0]),
                        }
                    });
                });
            }

            // Return the markers as a JSON response
            res.status(200).json(markers);
        });
    } catch (error) {
        res.status(500).json({error: 'Failed to fetch KML: ' + error.message});
    }
}