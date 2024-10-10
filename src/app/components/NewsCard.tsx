import React from "react";
import INews from "@/app/interfaces/news";
import Image from "next/image";

interface INewsCardProps {
    news: INews
}

const NewsCard: React.FC<INewsCardProps> = ({news}: INewsCardProps) => (
    <div className="flex flex-row">
        <Image className="rounded-full object-cover h-[100px] w-[100px] md:h-[120px] md:w-[120px]" src={news.logo}
               alt={news.title} width={120}
               height={120}
               loading="eager"/>
        <div className="ml-8">
            <h3 className="text-lg font-bold">{news.title}</h3>
            <div className="flex flex-row">
                <div>
                    {
                        news.isUnbiased ?
                            <label
                                className="bg-gray-700 text-white text-[10px] py-1 px-3 rounded-full mr-2">Unbiased</label>
                            : <span/>
                    }
                </div>
                <div>
                    {
                        news.isCommunity ?
                            <label
                                className="bg-gray-700 text-white text-[10px] py-1 px-3 rounded-full mr-2">Community</label>
                            : <span/>
                    }
                </div>
                <div>
                    {
                        news.isOfficial ?
                            <label
                                className="bg-gray-700 text-white text-[10px] py-1 px-3 rounded-full mr-2">Official</label>
                            : <span/>
                    }
                </div>
            </div>
            <div className="mt-4 text-sm">
                <p className="italic">{news.description}</p>
            </div>
            <div className="mt-2 flex flex-row items-center">
                <h4 className="font-bold">Language(s):</h4>
                <label className="ml-2">{news.languages.join(', ')}</label>
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