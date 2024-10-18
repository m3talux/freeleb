import React from "react";
import {InfoWindow} from "@react-google-maps/api";
import HoveredPolygon from "@/app/sections/map/interfaces/HoveredPolygon";

interface IDistrictWindowProps {
    hoveredPolygon: HoveredPolygon | null;
}

export default function DistrictWindow({hoveredPolygon}: IDistrictWindowProps) {
    if (hoveredPolygon) {
        return (
            <InfoWindow position={hoveredPolygon.position} options={{
                headerDisabled: true,
                disableAutoPan: true,
            }}>
                <div className="text-center">
                    <h4 className="text-[10px]">{hoveredPolygon.name}</h4>
                    <label className="font-bold text-sm">{hoveredPolygon.count}</label>
                </div>
            </InfoWindow>
        )
    }

    return <span/>
}