"use client";

import { clsx } from "clsx";
import { motion } from "framer-motion";
import Link from "next/link";
import { useState } from "react";
import { links } from "../../lib/AboutHeaderMenu";
import Demyth from "./Demyth";
import ToggleMenu from "./ToggleMenu";

/*flex-1 = 
	flex-grow=1 =>  default=0 (else allow the children to take the extra overspace of the parent containing the flex => fit the parent width container but can still overflow the container even with shrink=1 because there is a min intrinsic size of children)
	flex-shrink=1 => default=1 (else i.e. 0, when reducing the size of the pareint containing the flex, children will overflow and flex is hence useless)
	flex basis = 0 = width but with 0 no fixed px*/

const Header = () => {
    const [activeSection, setActiveSection] = useState("About");

    return (
        <header className="relative z-[999]">
            <nav
                className={clsx(
                    "fixed left-1/2 top-0 flex w-full max-w-10xl -translate-x-1/2 flex-row flex-nowrap items-center justify-between gap-x-6 p-4",
                    "border-b border-solid border-shark-800/70 bg-shark bg-opacity-95",
                    "md:px-8",
                )}
            >
                <Demyth />

                <div className="hidden w-full items-center justify-end gap-4 md:flex">
                    <ul className="mr-4 hidden gap-4 lg:flex">
                        {links.map((link) => (
                            <li key={link.hash} className="relative flex items-center justify-center">
                                <Link
                                    href={link.hash}
                                    onClick={() => setActiveSection(link.name)}
                                    className={clsx(
                                        "flex flex-col text-lg leading-normal transition duration-300 ease-in-out hover:text-astral",
                                    )}
                                >
                                    {link.name}
                                    {link.name === activeSection && (
                                        <motion.span
                                            className="absolute inset-0 -z-10 border-b border-astral pt-[1px] text-astral"
                                            layoutId="activeSection"
                                            transition={{
                                                type: "spring",
                                                stiffness: 380,
                                                damping: 30,
                                            }}
                                        ></motion.span>
                                    )}
                                </Link>
                            </li>
                        ))}
                    </ul>

                    <ButtonBorder href="#features" label="Login" />
                    <ButtonBg href="/about" label="Sign Up" />
                </div>

                <div className="block lg:hidden">
                    <ToggleMenu />
                </div>
            </nav>
        </header>
    );
};

const ButtonBorder = ({ href, label }: { href: string; label: string }) => {
    return (
        <Link href={href}>
            <button
                type="button"
                className={clsx(
                    "hidden w-[9rem] justify-center rounded-lg border border-gold-600 py-2 sm:flex",
                    "text-center text-lg font-semibold leading-normal text-gold-600",
                    "transition duration-150 ease-in-out",
                    "hover:border-astral hover:text-astral",
                    "focus:bg-shark-900 focus:outline-none focus:ring-0",
                    "active:bg-shark-800 active:text-astral",
                )}
            >
                {label}
            </button>
        </Link>
    );
};

const ButtonBg = ({ href, label }: { href: string; label: string }) => {
    return (
        <Link href={href}>
            <button
                type="button"
                className={clsx(
                    "hidden w-[9rem] justify-center rounded-lg border border-shark-900 py-2 sm:flex",
                    "bg-gradient-to-r from-gold-400 to-gold-600",
                    "text-center text-lg font-semibold leading-normal text-shark-900",
                    "transition duration-150 ease-in-out",
                    "hover:bg-gradient-to-r hover:from-astral-300 hover:to-astral-500",
                    "focus:border-astral-600 focus:bg-gradient-to-r focus:from-astral focus:to-astral-600 focus:outline-none focus:ring-0",
                    "active:border-astral active:bg-astral",
                )}
            >
                {label}
            </button>
        </Link>
    );
};

export default Header;
