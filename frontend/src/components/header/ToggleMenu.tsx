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
                } absolute top-20 right-0 mx-4 my-2 min-w-[140px] w-[140px] rounded-xl bg-black-gradient opacity-[97%]`}
            >
                <ul
                    className="flex flex-col text-end pt-2 md:pb-2 gap-y-2 w-full text-xl leading-normal"
                    onClick={() => setToggle((prev) => !prev)}
                >
                    {links.map((link, index) => (
                        <li
                            key={link.hash}
                            className={`w-full pr-4 hover:text-astral transition duration-150 ease-in-out`}
                        >
                            <Link href={link.hash}>{link.name}</Link>
                        </li>
                    ))}
                    <li className="flex-1 w-full md:hidden">
                        <button
                            type="button"
                            className="w-full text-end pr-4 py-2 border-t border-gold-600 text-gold-600 transition duration-150 ease-in-out hover:border-astral hover:text-astral focus:bg-shark-900 focus:outline-none focus:ring-0 active:bg-shark-800 active:text-astral"
                        >
                            <Link href={"#features"}>Login</Link>
                        </button>
                        <button
                            type="button"
                            className="w-full text-end py-2 pr-4 rounded-b-xl border border-shark-900 text-shark-900 bg-gradient-to-r from-gold-400 to-gold-600 transition duration-150 ease-in-out hover:bg-gradient-to-r hover:from-astral-300 hover:to-astral-500 focus:border-astral-600 focus:bg-gradient-to-r focus:from-astral focus:to-astral-600 focus: focus:outline-none focus:ring-0 active:border-astral active:bg-astral"
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
