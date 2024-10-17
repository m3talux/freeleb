'use client'

import {GoogleMap, Polygon, InfoWindow} from "@react-google-maps/api";
import React, {useEffect, useState} from "react";
import IFeature from "@/app/interfaces/map";
import geoTemplate from "@/app/content/polygons.json"

const defaultMapContainerStyle = {
    width: '100%',
    height: '750px',
};

const defaultMapCenter = {
    lat: 33.8938,
    lng: 35.5018
};

const defaultMapZoom = 9;

const defaultMapOptions = {
    zoomControl: true,
    tilt: 0,
    gestureHandling: 'auto',
    draggable: false,
    maxZoom: defaultMapZoom,
    minZoom: defaultMapZoom,
    styles: [
        {elementType: 'geometry', stylers: [{color: '#e5e5e5'}]},
        {elementType: 'labels.text.fill', stylers: [{visibility: 'off'}]},
        {elementType: 'labels.text.stroke', stylers: [{visibility: 'off'}]},
        {featureType: 'road', elementType: 'geometry', stylers: [{visibility: 'off'}]},
        {featureType: 'road', elementType: 'labels', stylers: [{visibility: 'off'}]},
        {featureType: 'water', elementType: 'geometry', stylers: [{color: '#c9c9c9'}]},
        {featureType: 'administrative', elementType: 'geometry', stylers: [{visibility: 'off'}]},
        {featureType: 'landscape', elementType: 'geometry.fill', stylers: [{color: '#f5f5f5'}]},
    ],
    disableDefaultUI: true,
};

// Helper function to calculate the centroid of a polygon
const calculateCentroid = (coordinates: number[][]): { lat: number, lng: number } => {
    let latSum = 0;
    let lngSum = 0;
    const totalPoints = coordinates.length;

    coordinates.forEach(coord => {
        latSum += coord[1];  // Latitude is the second value
        lngSum += coord[0];  // Longitude is the first value
    });

    return {
        lat: latSum / totalPoints,
        lng: lngSum / totalPoints,
    };
};

const MapComponent: React.FC = () => {
    const [features, setFeatures] = useState<IFeature[]>([]);
    const [hoveredPolygon, setHoveredPolygon] = useState<{
        name: string;
        count: number;
        position: { lat: number, lng: number }
    } | null>(null);

    useEffect(() => {
        const fetchFeatures = async () => {
            try {
                const response = await fetch('/api/features');
                if (response.ok) {
                    const data = await response.json();
                    setFeatures(data);
                } else {
                    console.error("Failed to fetch polygons:", response.statusText);
                }
            } catch (error) {
                console.error("Error fetching polygons:", error);
            }
        };

        setFeatures(geoTemplate.features as unknown as IFeature[]);
        fetchFeatures();
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
                {/* Render polygons from the GeoJSON data */}
                {features.map((feature, index) => (
                    feature.geometry.coordinates.map((polygon, i) => {
                        const centroid = calculateCentroid(polygon[0]);  // Calculate the centroid for the label

                        return (
                            <React.Fragment key={`${index}-${i}`}>
                                {/* Polygon */}
                                <Polygon
                                    paths={polygon[0].map(coord => ({
                                        lat: coord[1],
                                        lng: coord[0],
                                    }))}
                                    options={{
                                        fillColor: feature.properties.color ?? 'rgba(159,159,159,0.5)',
                                        strokeColor: 'rgba(159,159,159)',
                                        strokeOpacity: 1,
                                        strokeWeight: 2,
                                        fillOpacity: 0.8,
                                    }}
                                    onMouseOver={() => setHoveredPolygon({
                                        name: feature.properties.NAME_2,
                                        count: feature.properties.count,
                                        position: centroid
                                    })}
                                    onMouseOut={() => setHoveredPolygon(null)}
                                />
                            </React.Fragment>
                        );
                    })
                ))}

                {/* Display the hovered label */}
                {hoveredPolygon && (
                    <InfoWindow position={hoveredPolygon.position} options={{
                        disableAutoPan: true,
                        headerDisabled: true
                    }}>
                        <div style={{fontWeight: 'bold', fontSize: '10px'}}>
                            {hoveredPolygon.name} - Count: {hoveredPolygon.count}
                        </div>
                    </InfoWindow>
                )}
            </GoogleMap>
        </div>
    )
};

export default MapComponent;
