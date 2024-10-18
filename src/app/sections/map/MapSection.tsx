'use client'

import {MapProvider} from "@/app/sections/map/providers/map-provider";
import LebanonMap from "@/app/sections/map/containers/LebanonMap";

export default function MapSection() {
    return (
        <MapProvider>
            <LebanonMap/>
        </MapProvider>
    )
}