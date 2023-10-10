import Link from "next/link";
import React from "react";
import Demyth from "./Demyth";
import { links } from "../../lib/AboutHeaderMenu";
import ToggleMenu from "./ToggleMenu";
import { M_PLUS_1 } from "next/font/google";

//TODO add a CTA
//TODO add login in ToggleMenu
/*flex-1 = 
	flex-grow=1 =>  default=0 (else allow the children to take the extra overspace of the parent containing the flex => fit the parent width container but can still overflow the container even with shrink=1 because there is a min intrinsic size of children)
	flex-shrink=1 => default=1 (else i.e. 0, when reducing the size of the pareint containing the flex, children will overflow and flex is hence useless)
	flex basis = 0*/
const Header = () => {
    return (
        <header className="z-[999] relative">
            <nav className="fixed flex flex-row flex-nowrap items-center justify-between w-full p-4 md:px-8 border-b border-solid border-shark-800/70 bg-shark max-w-10xl top-0 left-1/2 -translate-x-1/2 bg-opacity-95 gap-x-6">
                <div className="border border-red-500">
                    <Demyth />
                </div>
                <div className="hidden md:flex justify-end items-center gap-4 border border-green-500 w-full">
                    <ul className="hidden lg:flex gap-4 mr-4">
                        {links.map((link) => (
                            <li
                                key={link.hash}
                                className="flex items-center justify-center leading-normal text-lg hover:text-astral transition duration-150 ease-in-out "
                            >
                                <Link href={link.hash}>{link.name}</Link>
                            </li>
                        ))}
                    </ul>
                    <button
                        type="button"
                        className="hidden sm:flex py-2 text-lg w-32 text-center justify-center font-semibold leading-normal rounded-lg border border-gold-600 text-gold-600 transition duration-150 ease-in-out hover:border-astral hover:text-astral focus:bg-shark-900 focus:outline-none focus:ring-0 active:bg-shark-800 active:text-astral"
                    >
                        <Link href={"#features"}>Login</Link>
                    </button>
                    <button
                        type="button"
                        className="hidden sm:flex py-2 text-lg w-32 text-center justify-center font-semibold leading-normal rounded-lg border border-shark-900 text-shark-900 bg-gradient-to-r from-gold-400 to-gold-600 transition duration-150 ease-in-out hover:bg-gradient-to-r hover:from-astral-300 hover:to-astral-500 focus:border-astral-600 focus:bg-gradient-to-r focus:from-astral focus:to-astral-600 focus: focus:outline-none focus:ring-0 active:border-astral active:bg-astral"
                    >
                        <Link href={"/about"}>Sign up</Link>
                    </button>
                </div>

                <div className="block lg:hidden">
                    <ToggleMenu />
                </div>
            </nav>
        </header>
    );
};

export default Header;
