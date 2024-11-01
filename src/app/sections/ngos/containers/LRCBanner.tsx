import Image from "next/image";

export default function LRCBanner() {
    return (
        <div className="relative min-h-[400px] w-full">
            <Image src="/jpeg/lrc_banner.jpg" alt="LRC Banner" width={700} height={400}
                   className="object-cover w-full h-auto min-h-[400px] max-h-[450px] rounded-3xl"/>
            <div className="absolute top-0 right-0 left-0 botom-0 h-full bg-black opacity-30 rounded-3xl"/>
            <div
                className="absolute top-0 right-0 left-0 botom-0 flex flex-col justify-center items-center text-center h-full">
                <Image src="/svg/lrc.svg" alt="LRC" width={250} height={250} className="w-[120px] md:w-[200px]"/>
                <p className="mt-4 md:mt-8 text-white text-lg md:text-2xl font-bold">They risk their
                    lives everyday for our country.</p>
                <a
                    className="mt-8 bg-white text-red-600 py-2 px-2 md:px-4 text-sm md:text-md font-bold rounded-md"
                    href="https://donate.redcrossredcrescent.org/lb/supportLRC/~my-donation"
                    target="_blank"
                >Donate Now</a>
            </div>
        </div>
    )
}