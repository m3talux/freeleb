import React from "react";

const Footer: React.FC = () => {
    return (
        <footer className="flex flex-col items-center p-8 text-red-800">
            <a className="underline text-sm" href="/privacy-policy">Privacy-Policy</a>
            <label className="mt-12 text-xs">© {new Date().getFullYear()} Freeleb. All rights reserved.</label>
        </footer>
    )
}

export default Footer;