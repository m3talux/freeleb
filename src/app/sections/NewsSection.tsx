import React from "react";
import news from "@/app/content/news.json";
import INews from "@/app/interfaces/news";
import NewsCard from "@/app/components/NewsCard";

const NewsSection: React.FC = () => {
    return (
        <section className="p-8 flex flex-col items-center md:items-start">
            <h2 className="text-2xl font-bold">Stay Informed</h2>
            <div className="mt-8 grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 md:gap-16 md:space-y-0 space-y-8">
                {
                    news.map((item: INews, index: number) =>
                        (
                            <NewsCard key={index} news={item}/>
                        )
                    )
                }
            </div>
        </section>
    )
}

export default NewsSection;