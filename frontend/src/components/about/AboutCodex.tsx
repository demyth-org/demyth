"use client";

import clsx from "clsx";
import { motion } from "framer-motion";
import Link from "next/link";
import { useState } from "react";
import { links } from "../../lib/AboutHeaderMenu";

const AboutCodex = () => {
    const [activeSection, setActiveSection] = useState("About");
    return (
        <section id="codex" className="scroll-mt-[100rem]">
            <ul className="mr-4 hidden gap-4 lg:flex">
                {links.map((link) => (
                    <li key={link.hash} className="relative flex items-center justify-center">
                        <Link
                            href="#contact"
                            onClick={() => setActiveSection(link.name)}
                            className={clsx("text-lg leading-normal hover:text-astral")}
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
        </section>
    );
};

export default AboutCodex;
