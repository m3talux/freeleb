import type {NextApiRequest, NextApiResponse} from "next";
import JSZip from 'jszip';
import xml2js from 'xml2js';
import { parse, differenceInDays } from 'date-fns';  // Importing date-fns for easier date manipulation

interface Folder {
    name: string[];
    Placemark?: Placemark[];
}

interface Placemark {
    name: string[];
    Point: Point[];
}

interface Point {
    coordinates: string[];
}

interface Marker {
    title: string;
    position: {
        lat: number;
        lng: number;
    };
    date: Date;  // Added date property for filtering purposes
}

const requestTimestamps: Record<string, number[]> = {};
const RATE_LIMIT = 1000; // 1 second in milliseconds
const REQUEST_LIMIT = 1;  // 1 request per second

export default async function handler(req: NextApiRequest, res: NextApiResponse) {
    const ip: string = req.headers['x-forwarded-for'] as string;

    if (!requestTimestamps[ip]) {
        requestTimestamps[ip] = [];
    }

    const now = Date.now();
    requestTimestamps[ip] = requestTimestamps[ip].filter(timestamp => now - timestamp < RATE_LIMIT);

    if (requestTimestamps[ip].length >= REQUEST_LIMIT) {
        return res.status(429).json({ error: 'Too many requests, please try again later.' });
    }

    requestTimestamps[ip].push(now);

    const kmlUrl = 'https://www.google.com/maps/d/u/0/kml?mid=13qY40wMpplijIQHuCr-Jd9o_3x8V8Lo';

    const period = req.query.period as string || "all"; // Default to "all"

    try {
        const response = await fetch(kmlUrl);
        if (!response.ok) {
            return res.status(response.status).json({ error: 'Failed to fetch ZIP file' });
        }

        const blob = await response.arrayBuffer();
        const zip = await JSZip.loadAsync(blob);
        const kmlFile = zip.file("doc.kml");
        if (!kmlFile) {
            return res.status(404).json({ error: 'KML file not found in ZIP' });
        }

        const kmlText = await kmlFile.async("text");

        xml2js.parseString(kmlText, (err, result) => {
            if (err) {
                console.error("Error parsing KML:", err);
                return res.status(500).json({ error: 'Failed to parse KML' });
            }

            const markers: Marker[] = [];
            const folder = result.kml.Document[0].Folder.find((f: Folder) => f.name[0] === "Israeli Strikes");

            if (folder && folder.Placemark) {
                folder.Placemark.forEach((placemark: Placemark) => {
                    const dateStr = placemark.name[0].split(" - ")[0]; // Extract date part from the name
                    const date = parse(dateStr, 'M/dd/yy', new Date()); // Parse the date using date-fns

                    const coords = placemark.Point[0].coordinates[0].split(",");
                    markers.push({
                        title: placemark.name[0],
                        position: {
                            lat: parseFloat(coords[1]),
                            lng: parseFloat(coords[0]),
                        },
                        date  // Add the extracted date
                    });
                });
            }

            // Now filter markers based on the period query param
            const filteredMarkers = markers.filter(marker => {
                const diffInDays = differenceInDays(new Date(), marker.date);

                switch (period) {
                    case "day":
                        return diffInDays <= 1;
                    case "week":
                        return diffInDays <= 7;
                    case "month":
                        return diffInDays <= 30;
                    case "all":
                    default:
                        return true;
                }
            });

            // Return the filtered markers as a JSON response
            res.status(200).json(filteredMarkers);
        });
    } catch (error: unknown) {
        res.status(500).json({ error: 'Failed to fetch KML: ' + error });
    }
}
