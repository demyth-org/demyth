import Link from "next/link";
import React from "react";

const Demyth = () => {
    /* <h1 className={`text-4xl sm:text-5xl md:text-6xl font-semibold demyth__gradient`}> */

    return (
        <h1 className={`text-4xl sm:text-5xl md:text-6xl font-semibold text-gradient`}>
            <Link href="/">DEMYTH</Link>
        </h1>
    );
};

export default Demyth;
