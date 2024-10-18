import Header from "@/app/components/Header";
import Image from "next/image";
import DonationsSection from "@/app/sections/DonationsSection";
import NewsSection from "@/app/sections/NewsSection";
import Footer from "@/app/components/Footer";
import MapSection from "@/app/sections/map/MapSection";

export default function Home() {
    return (
        <div className="flex flex-col items-center">
            <div className="max-w-7xl w-full">
                <Header/>
            </div>
            <Image src="/jpeg/skyline.jpeg" alt="beirut-skyline" width={1280} height={350}
                   loading="eager" className="max-h-[450px] object-cover w-screen"/>
            <div className="max-w-7xl w-full">
                <DonationsSection/>
            </div>
            <div className="max-w-7xl w-full">
                <NewsSection/>
            </div>
            <div className="max-w-7xl w-full mt-16">
                <MapSection/>
            </div>
            <div className="mt-8 w-full">
                <Footer/>
            </div>
        </div>
    );
}
