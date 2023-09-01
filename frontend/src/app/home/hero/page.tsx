import Link from "next/link";
import React from "react";
import Creature from "../creature/page";

const Hero = () => {
    return (
        <>
            <div>heros page</div>
            <Link href="/home/creature">
                <Creature god={"zeus"} />
            </Link>
        </>
    );
};

export default Hero;
