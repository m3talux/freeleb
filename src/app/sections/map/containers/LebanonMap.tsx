import {GoogleMap} from "@react-google-maps/api";
import React, {useEffect, useState} from "react";
import baseFeatures from "@/data/polygons.json"
import DistrictPolygon from "@/app/sections/map/components/DistrictPolygon";
import DistrictWindow from "@/app/sections/map/components/DistrictWindow";
import HoveredPolygon from "@/app/sections/map/interfaces/HoveredPolygon";
import {Feature} from "@/app/sections/map/interfaces/Feature";

const LebanonMap: React.FC = () => {
    const [features, setFeatures] = useState<Feature[]>([]);
    const [hoveredPolygon, setHoveredPolygon] = useState<HoveredPolygon | null>(null);

    const isMobile = window.innerWidth <= 768;

    const defaultMapContainerStyle = {
        width: isMobile ? '100%' : '500px',  // Adjust width for mobile
        height: isMobile ? '650px' : '750px',  // Adjust height for mobile
    };

    const defaultMapCenter = {
        lat: 33.764591,
        lng: 35.8453584
    };

    const defaultMapZoom = isMobile ? 8.5 : 8.8;

    const defaultMapOptions = {
        zoomControl: true,
        tilt: 0,
        gestureHandling: 'auto',
        draggable: false,
        maxZoom: defaultMapZoom,
        minZoom: defaultMapZoom,
        styles: [
            {elementType: 'geometry', stylers: [{color: '#ffffff'}]},
            {elementType: 'labels.text.fill', stylers: [{visibility: 'off'}]},
            {elementType: 'labels.text.stroke', stylers: [{visibility: 'off'}]},
            {featureType: 'road', elementType: 'geometry', stylers: [{visibility: 'off'}]},
            {featureType: 'road', elementType: 'labels', stylers: [{visibility: 'off'}]},
            {featureType: 'water', elementType: 'geometry', stylers: [{color: '#ffffff'}]},
            {featureType: 'administrative', elementType: 'geometry', stylers: [{visibility: 'off'}]},
            {featureType: 'landscape', elementType: 'geometry.fill', stylers: [{color: '#ffffff'}]},
        ],
        disableDefaultUI: true,
    };

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

        setFeatures(baseFeatures as unknown as Feature[]);
        fetchFeatures();
    }, []);

    return (
        <div className="py-8 w-full flex flex-col items-center">
            <h2 className="text-4xl font-black text-center">IDF Operations in Lebanon</h2>
            <p className="text-xs md:text-sm text-center mt-2">(Each operation could represent multiple airstrikes or bombings)</p>
            <div className="mt-8"/>
            <GoogleMap
                mapContainerStyle={defaultMapContainerStyle}
                center={defaultMapCenter}
                zoom={defaultMapZoom}
                options={defaultMapOptions}>
                {
                    features.map((feature, index) => (
                        feature.geometry.coordinates.map((polygon, i) => {
                            return (
                                <DistrictPolygon key={`${index}-${i}`} polygon={polygon}
                                                 properties={feature.properties}
                                                 onMouseOver={(hovered) => setHoveredPolygon(hovered)}
                                                 onMouseOut={() => setHoveredPolygon(null)}/>
                            );
                        })
                    ))
                }
                <DistrictWindow hoveredPolygon={hoveredPolygon}/>
            </GoogleMap>
        </div>
    )
};

export default LebanonMap;
