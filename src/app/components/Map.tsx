'use client'

import {GoogleMap, KmlLayer} from "@react-google-maps/api";
import React, {useEffect, useState} from "react";
import xml2js from "xml2js";

const defaultMapContainerStyle = {
    width: '100%',
    height: '750px',
};

const defaultMapCenter = {
    lat: 33.8938,
    lng: 35.5018
}

const defaultMapZoom = 9

const defaultMapOptions = {
    zoomControl: true,
    tilt: 0,
    gestureHandling: 'auto',
    draggable: true,
    maxZoom: 16,
    minZoom: 9,
};

const MapComponent: React.FC = () => {
    const [markers, setMarkers] = useState([]);

    useEffect(() => {
        const fetchKML = async () => {
            const response = await fetch('https://www.google.com/maps/d/u/0/kml?mid=13qY40wMpplijIQHuCr-Jd9o_3x8V8Lo');
            const text = await response.text();

            xml2js.parseString(text, (err, result) => {
                if (err) {
                    console.error("Error parsing KML:", err);
                    return;
                }

                const folder = result.kml.Document[0].Folder.find(f => f.name[0] === "Israeli Strikes");
                if (folder && folder.Placemark) {
                    const newMarkers = folder.Placemark.map(placemark => {
                        const coords = placemark.Point[0].coordinates[0].split(",");
                        return {
                            title: placemark.name[0],
                            position: {
                                lat: parseFloat(coords[1]),
                                lng: parseFloat(coords[0]),
                            }
                        };
                    });
                    setMarkers(newMarkers);
                }
            });
        };

        fetchKML();
    }, []);

    return (
        <div className="w-full flex flex-col items-center">
            <h2 className="text-2xl font-bold">IDF Strikes on Lebanon</h2>
            <i className="text-sm">(Marked in Blue)</i>
            <div className="mt-8"/>
            <GoogleMap
                mapContainerStyle={defaultMapContainerStyle}
                center={defaultMapCenter}
                zoom={defaultMapZoom}
                options={defaultMapOptions}
            >
                <KmlLayer
                    url="https://www.google.com/maps/d/u/0/kml?mid=13qY40wMpplijIQHuCr-Jd9o_3x8V8Lo"
                    options={{
                        suppressInfoWindows: false,
                        clickable: true,
                        zIndex: 9,
                        preserveViewport: true
                    }}
                />
            </GoogleMap>
        </div>
    )
};

export default MapComponent;