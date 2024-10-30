import IDonation from "@/app/interfaces/donations";
import React from "react";
import Image from "next/image";

interface IDonationCardProps {
    donation: IDonation
}

const DonationCard: React.FC<IDonationCardProps> = ({donation}: IDonationCardProps) => (
    <a
        className="text-center flex flex-col items-center"
        href={donation.url}
        target="_blank"
    >
        <Image className="object-contain rounded-3xl w-[120px] h-[120px] shadow-md p-1" src={donation.logo} alt={donation.title}
               width={120}
               height={120} loading="eager"/>
        <h4 className="mt-4 text-sm font-semibold max-w-[120px]">{donation.title}</h4>
    </a>
)

export default DonationCard;