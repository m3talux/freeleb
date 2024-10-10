import Header from "@/app/components/Header";
import Image from "next/image";
import Donations from "@/app/sections/donations/Donations";
import {MapProvider} from "@/app/providers/map-provider";
import MapComponent from "@/app/components/Map";

export default function Home() {
    return (
        <div className="flex flex-col items-center">
            <div className="max-w-7xl w-full">
                <Header/>
            </div>
            <Image src="/jpeg/skyline.jpeg" alt="beirut-skyline" width={1280} height={350}
                   loading="eager" className="max-h-[450px] object-cover w-screen"/>
            <div className="max-w-7xl w-full">
                <Donations/>
            </div>
            <div className="max-w-7xl w-full mt-8">
                <MapProvider>
                    <MapComponent/>
                </MapProvider>
            </div>
        </div>
    );
}
