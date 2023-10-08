import React from "react";
import Image from "next/image";
import Link from "next/link";
import { FaGithub, FaLinkedin, FaTwitter, FaYoutube } from "react-icons/fa";
import logo from "../../public/demyth_crop.gif";

const Footer = () => {
    return (
        <section>
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
        </section>
    );
};

export default Footer;
