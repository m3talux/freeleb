import {Polygon} from "@react-google-maps/api";
import React from "react";
import HoveredPolygon from "@/app/sections/map/interfaces/HoveredPolygon";
import {Properties} from "@/app/sections/map/interfaces/Properties";

interface IDistrictPolygonProps {
    polygon: number[][][];
    properties: Properties

    onMouseOver(hoveredPolygon: HoveredPolygon): void;

    onMouseOut(): void;
}

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

export default function DistrictPolygon({polygon, properties, onMouseOver, onMouseOut}: IDistrictPolygonProps) {
    const centroid = calculateCentroid(polygon[0]);

    return (
        <Polygon
            paths={polygon[0].map(coord => ({
                lat: coord[1],
                lng: coord[0],
            }))}
            options={{
                fillColor: properties.color ?? 'rgba(159,159,159,0.5)',
                strokeColor: 'rgba(159,159,159)',
                strokeOpacity: 1,
                strokeWeight: 1,
                fillOpacity: properties.count == 0 ? 0.3 : 0.75,
            }}
            onMouseOver={() => onMouseOver({
                name: properties.NAME_2,
                count: properties.count,
                position: centroid
            })}
            onMouseOut={onMouseOut}
        />
    )
}