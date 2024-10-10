'use client'

import {GoogleMap, Circle} from "@react-google-maps/api";
import React, {useEffect, useState} from "react";

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
        const fetchMarkers = async () => {
            const response = await fetch('/api/markers'); // Use your API route
            if (response.ok) {
                const data = await response.json();
                setMarkers(data);
            } else {
                console.error("Failed to fetch markers:", response.statusText);
            }
        };

        fetchMarkers();
    }, []);

    return (
        <div className="w-full flex flex-col items-center">
            <h2 className="text-2xl font-bold">IDF Strikes on Lebanon</h2>
            <div className="mt-8"/>
            <GoogleMap
                mapContainerStyle={defaultMapContainerStyle}
                center={defaultMapCenter}
                zoom={defaultMapZoom}
                options={defaultMapOptions}
            >
                {markers.map((marker, index) => (
                    <Circle
                        key={index}
                        center={marker.position}
                        radius={500} // Adjust the radius as needed (in meters)
                        options={{
                            fillColor: "rgba(255, 0, 0, 0.4)", // Red with opacity
                            strokeColor: "rgba(255, 0, 0, 0.6)", // Red border
                            strokeOpacity: 1,
                            strokeWeight: 2,
                        }}
                    />
                ))}
            </GoogleMap>
        </div>
    )
};

export default MapComponent;