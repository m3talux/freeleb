import Image from "next/image";

export default function LRCBanner() {
    return (
        <div className="relative w-full min-h-[400px]">
            <Image src="/jpeg/lrc_banner.jpg" alt="LRC Banner" width={1280} height={400}
                   className="object-cover w-full h-auto min-h-[400px] rounded-3xl"/>
            <div className="absolute top-0 left-0 bottom-0 right-0 bg-red-500 opacity-60 flex flex-row rounded-3xl">
                <div className="w-full"/>
            </div>
            <div className="absolute top-0 left-0 right-0 bottom-0 flex flex-col md:flex-row justify-center text-center md:text-left md:justify-between items-center p-8">
                <div>
                    <h3 className="font-bold text-white text-2xl md:text-6xl">Lebanese Red Cross</h3>
                    <p className="mt-4 md:mt-8 text-white text-lg md:text-2xl font-bold">They risk their
                        lives everyday for our country.</p>
                </div>
                <div
                    className="w-[350px] flex flex-col justify-center items-center mt-4 md:mt-0">
                    <Image src="/svg/lrc.svg" alt="LRC" width={250} height={250} className="w-[120px] md:w-[200px]"/>
                    <a
                        className="mt-8 bg-white text-red-600 py-2 px-2 md:px-4 text-sm md:text-md font-bold rounded-md"
                        href="https://donate.redcrossredcrescent.org/lb/supportLRC/~my-donation"
                        target="_blank"
                    >Donate Now</a>
                </div>
            </div>
        </div>
    )
}