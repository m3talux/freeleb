import React from "react";
import ngos from "@/data/ngos.json";
import NGOCard from "@/app/sections/ngos/components/NGOCard";
import LRCBanner from "@/app/sections/ngos/containers/LRCBanner";
import INGO from "@/app/interfaces/ngo";

const NGOsSection: React.FC = () => {
    return (
        <section className="py-8 flex flex-col items-center md:items-start">
            <h2 className="text-4xl font-black mb-8">Organizations</h2>
            <LRCBanner/>
            <div className="mt-8 flex flex-wrap items-start justify-center md:justify-start gap-8 md:gap-12">
                {
                    ngos.map((ngo: INGO, index: number) =>
                        (
                            <NGOCard key={index} ngo={ngo}/>
                        )
                    )
                }
            </div>
        </section>
    )
}

export default NGOsSection;