import Link from "next/link";
import React from "react";

const AboutCTA = () => {
    return (
        <section className="flex w-full flex-col items-center justify-center gap-4 sm:flex-row md:gap-x-8">
            <Link href={"#features"}>
                <button
                    type="button"
                    className="rounded-lg border border-gold-600 px-8 py-4 text-sm font-semibold uppercase leading-normal text-gold-600 transition duration-150 ease-in-out hover:border-astral hover:text-astral focus:bg-shark-900 focus:outline-none focus:ring-0 active:bg-shark-800 md:px-16 md:py-6 md:text-lg"
                >
                    Learn more
                </button>
            </Link>
            <Link href={"/about"}>
                <button
                    type="button"
                    className="focus: rounded-lg border-shark-900 bg-gradient-to-r from-gold-400 to-gold-600 px-8 py-4 text-sm font-semibold uppercase leading-normal text-shark-900 transition duration-150 ease-in-out hover:bg-gradient-to-r hover:from-astral-300 hover:to-astral-500 focus:border-astral-600 focus:bg-gradient-to-r focus:from-astral focus:to-astral-600 focus:outline-none focus:ring-0 active:border-astral active:bg-astral md:px-16 md:py-6 md:text-lg"
                >
                    Get started
                </button>
            </Link>
        </section>
    );
};

export default AboutCTA;
