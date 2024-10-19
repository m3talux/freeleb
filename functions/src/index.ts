import * as functions from "firebase-functions";
import * as admin from "firebase-admin";
import * as xml2js from "xml2js";
import {parse} from "date-fns";

// Initialize Firebase Admin SDK
admin.initializeApp();

// Firestore database reference
const db = admin.firestore();

// eslint-disable-next-line @typescript-eslint/no-var-requires
const JSZip = require("jszip");

/**
 * Fetches KML data from the specified URL.
 * @return {Promise<string>} The KML text as a string.
 */
async function fetchKMLData(): Promise<string> {
  const kmlUrl = "https://www.google.com/maps/d/u/0/kml?mid=13qY40wMpplijIQHuCr-Jd9o_3x8V8Lo";

  try {
    const response = await fetch(kmlUrl);
    if (!response.ok) {
      throw new Error("Failed to fetch KML file");
    }

    const blob = await response.arrayBuffer();
    const zip = await JSZip.loadAsync(blob);
    const kmlFile = zip.file("doc.kml");

    if (!kmlFile) {
      throw new Error("KML file not found in ZIP");
    }

    return await kmlFile.async("text");
  } catch (error) {
    console.error("Error fetching KML:", error);
    throw error;
  }
}

/**
 * Parses a KML date string and returns a JavaScript Date object.
 * The date string may be in formats like "M/d/yy" or "MM/dd/yy".
 * @param {string} dateStr - The date string to parse.
 * @return {Date | null} The parsed Date object, or null if invalid.
 */
function parseKMLDate(dateStr: string): Date | null {
  // Split the date string by '/'
  const parts = dateStr.split("/");

  // Check if the date parts are valid
  if (parts.length !== 3) {
    console.warn(`Invalid date format: ${dateStr}`);
    return null; // Return null for invalid format
  }

  // Normalize month and day to be 0-padded if necessary
  const month = parts[0].padStart(2, "0");
  const day = parts[1].padStart(2, "0");
  const year = parts[2].length === 2 ? `20${parts[2]}` : parts[2];

  // Create a new date string in the format "MM/dd/yyyy" for parsing
  const normalizedDateStr = `${month}/${day}/${year}`;

  // Parse the normalized date string
  const date = parse(normalizedDateStr, "MM/dd/yyyy", new Date());

  // Check if the parsed date is valid
  if (isNaN(date.getTime())) {
    console.warn(`Invalid date encountered for: ${normalizedDateStr}`);
    return null; // Return null if the date is invalid
  }

  return date; // Return the valid Date object
}

/**
 * Processes the fetched KML data and extracts marker information.
 * @param {string} kmlText - The KML text to process.
 * @return {Promise<any[]>} An array of marker objects containing
 * date, lat, lng, and description.
 */
async function processKMLData(kmlText: string): Promise<any[]> {
  const parsedKML = await xml2js.parseStringPromise(kmlText);
  const markers: any[] = [];

  const folder = parsedKML.kml.Document[0].Folder.find(
    (f: any) => f.name[0] === "Israeli Strikes"
  );

  if (folder && folder.Placemark) {
    folder.Placemark.forEach((placemark: any) => {
      const regex = /^(\d{1,2}\/\d{1,2}\/\d{2,4})\s*[-]?\s*(.*)$/;
      const placemarkName = placemark.name[0].trim();

      const match = placemarkName.match(regex);
      let date;
      let description;

      if (match) {
        const dateStr = match[1].trim();
        date = parseKMLDate(dateStr); // Parse the date
        description = match[2].trim(); // Extract description
      } else {
        date = null;
        description = placemarkName;
        console.log(`No date found for placemark: ${placemarkName}`);
      }

      const coords = placemark.Point[0].coordinates[0].split(",");
      const record = {
        date: date,
        lat: parseFloat(coords[1]),
        lng: parseFloat(coords[0]),
        description: description,
      };
      markers.push(record);
    });
  }

  return markers;
}

/**
 * Stores new records in Firestore by deleting existing records
 * and reinserting new ones.
 * @param {any[]} markers - An array of marker objects to store in Firestore.
 * @return {Promise<void>}
 */
async function storeNewRecords(markers: any[]): Promise<void> {
  const recordsRef = db.collection("records");

  // Fetch all records to delete them
  const allRecordsSnapshot = await recordsRef.get();

  // Create a batch to delete all records
  const batch = db.batch();
  allRecordsSnapshot.forEach((doc) => {
    batch.delete(doc.ref);
  });

  // Sort the markers by date incrementally (ascending order)
  const sortedMarkers = markers.sort((a, b) => a.date - b.date);

  for (const record of sortedMarkers) {
    const newDocRef = recordsRef.doc();
    batch.set(newDocRef, record);
  }

  // Commit the batch insertions
  await batch.commit();
  console.log(`Inserted ${sortedMarkers.length} new records.`);
}

/**
 * Scheduled Cloud Function to fetch KML data and store new records.
 * Runs twice a day at 6 AM and 6 PM.
 */
export const fetchKMLJob =
    functions.scheduler.onSchedule("0 6,18 * * *", async () => {
      console.log("Scheduled function started: Fetching KML data...");

      try {
        const kmlText = await fetchKMLData();
        const markers = await processKMLData(kmlText);
        await storeNewRecords(markers);

        console.log("Scheduled function completed:" +
                " New records stored successfully.");
      } catch (error) {
        console.error("Scheduled function failed:", error);
      }
    });
