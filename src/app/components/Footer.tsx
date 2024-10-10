import React from "react";

const Footer: React.FC = () => {
    return (
        <footer className="flex flex-col items-center p-2 bg-gray-700">
            <a className="text-white underline" href="/privacy-policy">Privacy-Policy</a>
            <label className="text-white mt-8 text-sm">All rights reserved © {new Date().getFullYear()}</label>
        </footer>
    )
}

export default Footer;