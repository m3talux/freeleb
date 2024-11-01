import Header from "@/app/components/Header";
import NGOsSection from "@/app/sections/ngos/NGOsSection";
import NewsSection from "@/app/sections/news/NewsSection";
import Footer from "@/app/components/Footer";
import MapSection from "@/app/sections/map/MapSection";
import AboutSection from "@/app/sections/about/AboutSection";

export default function Home() {
    return (
        <div>
            <Header/>
            <div className="w-full bg-gray-100 h-[1px] mb-8 md:mb-16"/>
            <div className="w-screen flex flex-col justify-start items-center">
                <div className="max-w-7xl px-8 xl:px-0">
                    <AboutSection/>
                    <div className="mt-8"/>
                    <NGOsSection/>
                    <NewsSection/>
                    <MapSection/>
                </div>
            </div>
            <div className="w-full bg-gray-100 h-[1px] mt-8"/>
            <Footer/>
        </div>
    );
}
