"use client";
import React, { useState } from "react";

import { links } from "../../lib/AboutHeaderMenu";
import { HiOutlineMenuAlt3 } from "react-icons/hi";
import { AiOutlineClose } from "react-icons/ai";
import Link from "next/link";

//TODO add cta
const ToggleMenu = () => {
    const [toggle, setToggle] = useState(false);

    return (
        <div className="flex ">
            <div className="text-3xl" onClick={() => setToggle((prev) => !prev)}>
                {toggle ? <AiOutlineClose /> : <HiOutlineMenuAlt3 />}
            </div>
            <div
                className={`${
                    toggle ? "flex" : "hidden"
                } bg-black-gradient absolute right-0 top-20 mx-4 my-2 w-[140px] min-w-[140px] rounded-xl opacity-[97%]`}
            >
                <ul
                    className="flex w-full flex-col gap-y-2 pt-2 text-end text-xl leading-normal md:pb-2"
                    onClick={() => setToggle((prev) => !prev)}
                >
                    {links.map((link, index) => (
                        <li
                            key={link.hash}
                            className={`w-full pr-4 transition duration-150 ease-in-out hover:text-astral`}
                        >
                            <Link href={link.hash}>{link.name}</Link>
                        </li>
                    ))}
                    <li className="w-full flex-1 md:hidden">
                        <button
                            type="button"
                            className="w-full border-t border-gold-600 py-2 pr-4 text-end text-gold-600 transition duration-150 ease-in-out hover:border-astral hover:text-astral focus:bg-shark-900 focus:outline-none focus:ring-0 active:bg-shark-800 active:text-astral"
                        >
                            <Link href={"#features"}>Login</Link>
                        </button>
                        <button
                            type="button"
                            className="focus: w-full rounded-b-xl border border-shark-900 bg-gradient-to-r from-gold-400 to-gold-600 py-2 pr-4 text-end text-shark-900 transition duration-150 ease-in-out hover:bg-gradient-to-r hover:from-astral-300 hover:to-astral-500 focus:border-astral-600 focus:bg-gradient-to-r focus:from-astral focus:to-astral-600 focus:outline-none focus:ring-0 active:border-astral active:bg-astral"
                        >
                            <Link href={"/about"}>Sign up</Link>
                        </button>
                    </li>
                </ul>
            </div>
        </div>
    );
};

export default ToggleMenu;
