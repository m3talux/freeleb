import React from "react";
import Image from "next/image";

const Header: React.FC = () => {
    return (
        <header className="flex flex-row items-center justify-between p-2 md:p-4">
            <div className="flex flex-row items-center">
                <Image src="/png/lb-heart.png" alt="leabon-heart" width={65} height={65} loading="eager"/>
                <div className="ml-4">
                    <h1 className="text-3xl font-bold uppercase">Freeleb</h1>
                    <p className="text-xs">For a united Lebanon</p>
                </div>
            </div>
            <label></label>
        </header>
    )
}

export default Header;