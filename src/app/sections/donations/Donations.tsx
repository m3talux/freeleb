import React from "react";
import Image from "next/image";
import donations from "@/app/content/donations.json";
import IDonation from "@/app/interfaces/donations";

const Donations: React.FC = () => {
    return (
        <section className="p-8 flex flex-col items-center md:items-start">
            <h2 className="text-2xl font-bold">Where can I donate?</h2>
            <div className="mt-8 grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4">
                {
                    donations.map((donation: IDonation, index: number) =>
                        (
                            <div key={index}
                                 className="text-center flex flex-col items-center shadow-lg rounded-lg w-[250px]">
                                <div
                                    className="text-white py-1 w-full rounded-t-lg font-bold text-xs"
                                    style={{backgroundColor: donation.color}}>{donation.type}</div>
                                <div className="p-4 flex flex-col items-center">
                                    <Image src={donation.logo} alt={donation.title} width={80} height={80}/>
                                    <h4 className="mt-4 text-sm">{donation.title}</h4>
                                    <a className="mt-4 px-3 py-2 text-white text-sm font-bold rounded-md"
                                       style={{backgroundColor: donation.color}}
                                       href={donation.url}
                                       target="_blank">Donate
                                        Now</a>
                                </div>
                            </div>
                        )
                    )
                }
            </div>
        </section>
    )
}

export default Donations;