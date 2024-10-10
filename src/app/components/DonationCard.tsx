import IDonation from "@/app/interfaces/donations";
import React from "react";
import Image from "next/image";

interface IDonationCardProps {
    donation: IDonation
}

const DonationCard: React.FC<IDonationCardProps> = ({donation}: IDonationCardProps) => (
    <a
        className="text-center flex flex-col items-center max-w-[180px]"
        href={donation.url}
        target="_blank"
    >
        <Image className="rounded-full object-cover w-[80px] h-[80px]" src={donation.logo} alt={donation.title}
               width={80}
               height={80} loading="eager"/>
        <h4 className=" mt-2 text-sm">{donation.title}</h4>
        <div
            className="mt-2 text-white py-1 px-2 rounded-lg font-bold text-[10px]"
            style={{backgroundColor: donation.color}}>{donation.type}</div>
    </a>
)

export default DonationCard;