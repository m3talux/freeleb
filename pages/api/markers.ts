import type {NextApiRequest, NextApiResponse} from "next";
import JSZip from 'jszip';
import xml2js from 'xml2js';

export default async function handler(req: NextApiRequest, res: NextApiResponse) {
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