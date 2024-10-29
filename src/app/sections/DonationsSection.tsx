import React from "react";
import donations from "@/data/donations.json";
import IDonation from "@/app/interfaces/donations";
import DonationCard from "@/app/components/DonationCard";
import LRCBanner from "@/app/components/LRCBanner";

const DonationsSection: React.FC = () => {
    return (
        <section className="py-8 flex flex-col items-center md:items-start">
            <h2 className="text-4xl font-black mb-8">Where can I donate?</h2>
            <LRCBanner/>
            <div className="mt-8 grid grid-cols-2 md:grid-cols-4 lg:grid-cols-6 gap-4">
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