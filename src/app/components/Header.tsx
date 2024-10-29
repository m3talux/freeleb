import React from "react";
import Image from "next/image";

const Header: React.FC = () => {
    return (
        <header className="flex flex-row items-center justify-between px-4 md:px-8 py-4">
            <div className="flex flex-row items-center">
                <Image src="/svg/logo.svg" alt="Freeleb Logo" width={24} height={24} loading="eager"/>
                <h1 className="text-2xl font-bold ml-4">Freeleb</h1>
            </div>
            <div className="flex flex-row items-center justify-end">
                <button className="ml-4 text-white bg-red-500 px-4 py-2 rounded-xl font-bold text-sm">Register</button>
            </div>
        </header>
    )
}

export default Header;