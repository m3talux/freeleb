import React from "react";
import Image from "next/image";
import INGO from "@/app/interfaces/ngo";

interface INGOCardProps {
    ngo: INGO
}

const NGOCard: React.FC<INGOCardProps> = ({ngo}: INGOCardProps) => (
    <a
        className="text-center flex flex-col items-center"
        href={ngo.url}
        target="_blank"
    >
        <Image className="object-contain rounded-3xl w-[100px] h-[100px] border-[1px] border-gray-200 p-2"
               src={ngo.logo} alt={ngo.title}
               width={120}
               height={120} loading="eager"/>
        <h4 className="mt-4 text-xs font-semibold max-w-[120px]">{ngo.title}</h4>
    </a>
)

export default NGOCard;