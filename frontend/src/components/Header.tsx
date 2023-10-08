import Link from "next/link";
import React from "react";
import Demyth from "./Demyth";
import { links } from "../lib/data";
import ToggleMenu from "./ToggleMenu";

//TODO add a CTA
//TODO add login
const Header = () => {
    return (
        <header className="z-[999] relative">
            <nav className="fixed flex items-center justify-between w-full p-4 md:px-8 border-b-2 border-solid border-shark-900 bg-shark max-w-10xl top-0 left-1/2 -translate-x-1/2">
                <Demyth />
                <ul className="flex-1 flex justify-end items-center sm:gap-6 md:gap-8 max-sm:hidden">
                    {links.map((link) => (
                        <li
                            key={link.hash}
                            className="flex items-center justify-center leading-normal text-lg hover:text-astral transition "
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
