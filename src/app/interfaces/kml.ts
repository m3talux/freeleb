export interface KmlData {
    kml?: Kml;
}

export interface Kml {
    Document: Document[];
}

export interface Document {
    Folder: Folder[];
}

export default interface Folder {
    name: string[];
    Placemark?: Placemark[];
}

export interface Placemark {
    name: string[];
    Point: Point[];
}

export interface Point {
    coordinates: string[];
}

export interface Marker {
    title: string;
    position: {
        lat: number;
        lng: number;
    };
    date: Date;
}