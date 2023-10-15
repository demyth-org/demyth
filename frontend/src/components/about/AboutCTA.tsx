import Link from "next/link";
import React from "react";

const AboutCTA = () => {
    return (
        <section className="flex items-center w-full h-auto justify-center mt-8 gap-4 md:gap-x-8">
            <button
                type="button"
                className="px-8 py-4 md:px-16 md:py-6 text-sm md:text-lg font-semibold uppercase leading-normal rounded-lg border border-gold-600 text-gold-600 transition duration-150 ease-in-out hover:border-astral hover:text-astral focus:bg-shark-900 focus:outline-none focus:ring-0 active:bg-shark-800"
            >
                <Link href={"#features"}>Learn more</Link>
            </button>
            <button
                type="button"
                className="px-8 py-4 md:px-16 md:py-6 text-sm md:text-lg rounded-lg font-semibold uppercase leading-normal bg-gradient-to-r from-gold-400 to-gold-600 transition duration-150 ease-in-out hover:bg-gradient-to-r hover:from-astral-300 hover:to-astral-500 focus:border-astral-600 focus:bg-gradient-to-r focus:from-astral focus:to-astral-600 focus: focus:outline-none focus:ring-0 active:border-astral active:bg-astral text-shark-900 border-shark-900"
            >
                <Link href={"/about"}>Get started</Link>
            </button>
        </section>
    );
};

export default AboutCTA;
