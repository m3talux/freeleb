import React from "react";
import donations from "@/app/content/donations.json";
import IDonation from "@/app/interfaces/donations";
import DonationCard from "@/app/components/DonationCard";

const DonationsSection: React.FC = () => {
    return (
        <section className="p-8 flex flex-col items-center md:items-start">
            <h2 className="text-2xl font-bold">Where can I donate?</h2>
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