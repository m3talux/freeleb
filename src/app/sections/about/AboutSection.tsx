import Image from "next/image";

export default function AboutSection() {
    return (
        <section>
            <div className="relative">
                <Image src="/png/graphic.png" alt="About Us" width={1280} height={780}
                       className="object-cover rounded-3xl min-h-[500px]" loading="eager"/>
                <div
                    className="absolute top-0 right-0 bottom-0 left-0 flex flex-col items-center justify-center text-white p-8 md:p-16 text-center">
                    <h2 className="text-3xl md:text-6xl font-black leading-10 md:leading-[80px]">We provide information to help Lebanon during
                        crises.</h2>
                    <p className="text-white mt-8 text-md md:text-xl font-bold">We believe that by providing the right information
                        at the right time, we can help each other better.</p>
                </div>
                <div className="absolute text-[8px] md:text-xs text-white bottom-4 right-4">*The background picture is AI generated.
                </div>
            </div>
            <div className="mt-16">
                <h2 className="text-3xl md:text-4xl font-black">What we do</h2>
                <p className="mt-4 text-md md:text-lg">
                    <strong>Freeleb</strong> provides and lets its community members provide open-source information to
                    help individuals and organizations respond to
                    humanitarian crises. Our mission is to empower people to make a
                    positive impact during times of need.
                </p>
            </div>
        </section>
    )
}