import Link from "next/link";
import React from "react";
import Demyth from "./Demyth";
import { links } from "../../lib/AboutHeaderMenu";
import ToggleMenu from "./ToggleMenu";

//TODO add a CTA
//TODO add login
//TODO fix appearance of burger too late
const Header = () => {
    return (
        <header className="z-[999] relative">
            <nav className="fixed flex items-center justify-between w-full p-4 md:px-8 border-b border-solid border-shark-800/70 bg-shark max-w-10xl top-0 left-1/2 -translate-x-1/2 bg-opacity-95">
                <Demyth />
                <ul className="flex-1 flex justify-end items-center sm:gap-6 md:gap-8 max-sm:hidden">
                    {links.map((link) => (
                        <li
                            key={link.hash}
                            className="flex items-center justify-center leading-normal text-lg hover:text-astral transition duration-150 ease-in-out "
                        >
                            <Link href={link.hash}>{link.name}</Link>
                        </li>
                    ))}
                </ul>
                <div className="hidden max-sm:block">
                    <ToggleMenu />
                </div>
            </nav>
        </header>
    );
};

export default Header;
