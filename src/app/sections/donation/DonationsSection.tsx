import React from "react";
import donations from "@/data/donations.json";
import IDonation from "@/app/interfaces/donations";
import DonationCard from "@/app/sections/donation/components/DonationCard";
import LRCBanner from "@/app/sections/donation/containers/LRCBanner";

const DonationsSection: React.FC = () => {
    return (
        <section className="py-8 flex flex-col items-center md:items-start">
            <h2 className="text-4xl font-black mb-8">Organizations</h2>
            <LRCBanner/>
            <h3 className="text-2xl font-bold mt-8 text-center w-full">NGOs</h3>
            <div className="mt-8 flex flex-wrap items-start justify-center gap-8 md:gap-12">
                {
                    donations.map((donation: IDonation, index: number) =>
                        (
                            <DonationCard key={index} donation={donation}/>
                        )
                    )
                }
            </div>
        </section>
    )
}

export default DonationsSection;