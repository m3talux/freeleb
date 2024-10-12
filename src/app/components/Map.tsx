'use client'

import {GoogleMap, Circle} from "@react-google-maps/api";
import React, {useEffect, useState} from "react";

interface Marker {
    title: string;
    position: {
        lat: number;
        lng: number;
    };
}

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
    const [loading, setLoading] = useState(false);
    const [period, setPeriod] = useState('day');

    useEffect(() => {
        const fetchMarkers = async () => {
            setLoading(true);
            setMarkers([]);

            const response = await fetch('/api/markers?period=' + period); // Use your API route
            if (response.ok) {
                const data = await response.json();
                setMarkers(data);
            } else {
                console.error("Failed to fetch markers:", response.statusText);
            }
            setLoading(false);
        };

        fetchMarkers();
    }, [period]);

    return (
        <div className="w-full flex flex-col items-center">
            <h2 className="text-2xl font-bold">IDF Strikes on Lebanon</h2>
            <div className="mt-2 flex flex-row justify-between w-full">
                <span/>
                {
                    loading ? <div role="status">
                        <svg aria-hidden="true"
                             className="w-8 h-8 text-gray-200 animate-spin"
                             viewBox="0 0 100 101" fill="red" xmlns="http://www.w3.org/2000/svg">
                            <path
                                d="M100 50.5908C100 78.2051 77.6142 100.591 50 100.591C22.3858 100.591 0 78.2051 0 50.5908C0 22.9766 22.3858 0.59082 50 0.59082C77.6142 0.59082 100 22.9766 100 50.5908ZM9.08144 50.5908C9.08144 73.1895 27.4013 91.5094 50 91.5094C72.5987 91.5094 90.9186 73.1895 90.9186 50.5908C90.9186 27.9921 72.5987 9.67226 50 9.67226C27.4013 9.67226 9.08144 27.9921 9.08144 50.5908Z"
                                fill="currentColor"/>
                            <path
                                d="M93.9676 39.0409C96.393 38.4038 97.8624 35.9116 97.0079 33.5539C95.2932 28.8227 92.871 24.3692 89.8167 20.348C85.8452 15.1192 80.8826 10.7238 75.2124 7.41289C69.5422 4.10194 63.2754 1.94025 56.7698 1.05124C51.7666 0.367541 46.6976 0.446843 41.7345 1.27873C39.2613 1.69328 37.813 4.19778 38.4501 6.62326C39.0873 9.04874 41.5694 10.4717 44.0505 10.1071C47.8511 9.54855 51.7191 9.52689 55.5402 10.0491C60.8642 10.7766 65.9928 12.5457 70.6331 15.2552C75.2735 17.9648 79.3347 21.5619 82.5849 25.841C84.9175 28.9121 86.7997 32.2913 88.1811 35.8758C89.083 38.2158 91.5421 39.6781 93.9676 39.0409Z"
                                fill="currentFill"/>
                        </svg>
                        <span className="sr-only">Loading...</span>
                    </div> : <div className="flex flex-row rounded-md bg-gray-100 gap-4 px-4 py-2">
                        <button className={period === 'day' ? `text-red-500` : ``} onClick={() => setPeriod('day')}>D
                        </button>
                        <button className={period === 'week' ? `text-red-500` : ``} onClick={() => setPeriod('week')}>W
                        </button>
                        <button className={period === 'month' ? `text-red-500` : ``}
                                onClick={() => setPeriod('month')}>M
                        </button>
                        <button className={period === 'all' ? `text-red-500` : ``} onClick={() => setPeriod('all')}>Max
                        </button>
                    </div>
                }
            </div>
            <div className="mt-8"/>
            <GoogleMap
                key={period}
                mapContainerStyle={defaultMapContainerStyle}
                center={defaultMapCenter}
                zoom={defaultMapZoom}
                options={defaultMapOptions}
            >
                {markers.map((marker: Marker, index) => (
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