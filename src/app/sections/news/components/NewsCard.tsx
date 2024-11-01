import React from "react";
import INews from "@/app/interfaces/news";
import Image from "next/image";

interface INewsCardProps {
    news: INews
}

const NewsCard: React.FC<INewsCardProps> = ({news}: INewsCardProps) => (
    <div className="flex flex-row">
        <Image className="rounded-full object-contain h-[80px] w-[80px] md:h-[100px] md:w-[100px]" src={news.logo}
               alt={news.title} width={80}
               height={80}
               loading="eager"/>
        <div className="ml-8">
            <h3 className="text-lg font-bold">{news.title}</h3>
            <label
                className="bg-gray-700 text-white text-[10px] py-1 px-3 rounded-full mr-2">{news.tag}</label>
            <div className="mt-4 text-sm">
                <p className="italic">{news.description}</p>
            </div>
            <div className="mt-4 flex flex-row space-x-2 items-center">
                {
                    news.website !== '' ?
                        <a href={news.website} target="_blank" rel="noopener noreferrer">
                            <Image src="/svg/website.svg" alt="website" width={28} height={28} loading="eager"/>
                        </a> : <span/>
                }
                {
                    news.instagram !== '' ?
                        <a href={news.instagram} target="_blank" rel="noopener noreferrer">
                            <Image src="/svg/instagram.svg" alt="website" width={28} height={28} loading="eager"/>
                        </a> : <span/>
                }
                {
                    news.whatsapp !== '' ?
                        <a href={news.whatsapp} target="_blank" rel="noopener noreferrer">
                            <Image src="/svg/whatsapp.svg" alt="website" width={28} height={28} loading="eager"/>
                        </a> : <span/>
                }

            </div>
        </div>
    </div>
)

export default NewsCard;