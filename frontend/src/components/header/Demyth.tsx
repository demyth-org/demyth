import Link from "next/link";
import React from "react";

const Demyth = () => {
    /* pb-3 because blanka is not well middle aligned */
    return (
        <h1 className={`text-gradient pb-2 font-blanka text-3xl font-light sm:text-4xl md:tall:text-5xl`}>
            <Link href="/">DEMYTH</Link>
        </h1>
    );
};

export default Demyth;
