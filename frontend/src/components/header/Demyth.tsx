import Link from "next/link";
import React from "react";

const Demyth = () => {
    /* pb-3 because blanka is not well middle aligned */
    return (
        <h1 className={`text-gradient pb-3 font-blanka text-5xl font-light`}>
            <Link href="/">DEMYTH</Link>
        </h1>
    );
};

export default Demyth;
