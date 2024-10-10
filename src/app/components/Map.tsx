'use client'

import {GoogleMap} from "@react-google-maps/api";
import React from "react";

const defaultMapContainerStyle = {
    width: '100%',
    height: '800px',
    borderRadius: '15px 0px 0px 15px',
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
};

const MapComponent: React.FC = () => {
    return (
        <div className="w-full">
            <GoogleMap
                mapContainerStyle={defaultMapContainerStyle}
                center={defaultMapCenter}
                zoom={defaultMapZoom}
                options={defaultMapOptions}
            >
            </GoogleMap>
        </div>
    )
};

export default MapComponent;