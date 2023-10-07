"use client";
import React, { useState } from "react";

import { links } from "../lib/data";
import { HiOutlineMenuAlt3 } from "react-icons/hi";
import { AiOutlineClose } from "react-icons/ai";
import Link from "next/link";

const ToggleMenu = () => {
    const [toggle, setToggle] = useState(false);

    return (
        <div className="flex justify-items-center">
            <div className="text-2xl sm:text-4xl" onClick={() => setToggle((prev) => !prev)}>
                {toggle ? <AiOutlineClose /> : <HiOutlineMenuAlt3 />}
            </div>
            <div
                className={`${
                    toggle ? "flex" : "hidden"
                } absolute p-6 top-20 right-0 mx-4 my-2 min-w-[140px] rounded-xl bg-black-gradient`}
            >
                <ul className="flex flex-col justify-end items-end flex-1">
                    {links.map((link, index) => (
                        <li
                            key={link.hash}
                            className={`text-xl ${
                                index === links.length - 1 ? "mr-0" : "mb-4"
                            } hover:text-astral transition`}
                        >
                            <Link href={link.hash}>{link.name}</Link>
                        </li>
                    ))}
                </ul>
            </div>
        </div>
    );
};

export default ToggleMenu;
