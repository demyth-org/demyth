import Link from "next/link";
import React from "react";
import { FaGithub, FaLinkedin, FaTwitter, FaYoutube } from "react-icons/fa";

const HomeHeader = () => {
    return (
        <nav className="bg-slate-700 p-4 sticky top-0 drop-shadow-xl z-10 border-b-2 border-solid border-slate-600">
            <div className="mx-auto flex justify-between items-center flex-col sm:flex-row">
                <h1 className="text-3xl font-semibold text-transparent bg-clip-text from-emerald-800 via-teal-500 to-orange-200 bg-gradient-to-r ml-10 xl:ml-[25%]">
                    <Link href="/">Demyth</Link>
                </h1>
                <div className="flex flex-row justify-center sm:justify-evenly align-middle gap-4 text-slate-200 text-2xl lg:text-3xl">
                    <Link className="text-slate-200 hover:text-50" href="https://www.youtube.com">
                        <FaYoutube />
                    </Link>
                    <Link className="text-slate-200 hover:text-50" href="https://twitter.com/">
                        <FaTwitter />
                    </Link>
                    <Link className="text-slate-200 hover:text-50" href="https://github.com/">
                        <FaGithub />
                    </Link>
                    <Link className="text-slate-200 hover:text-50" href="https://twitter.com/">
                        <FaLinkedin />
                    </Link>
                </div>
            </div>
        </nav>
    );
};

export default HomeHeader;
