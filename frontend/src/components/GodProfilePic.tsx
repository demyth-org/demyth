import React from "react";
import Image from "next/image";
import godPic from "../../public/images/Roles/hero1.png";

const GodProfilePic = () => {
    return (
        <section className="w-full mx-auto">
            <Image
                className="border-2 border-slate-950 drop-shadow-xl shadow-slate-950 rounded-2xl mx-auto mt-8"
                src={godPic}
                alt="anHero"
                quality={100}
                priority={true}
            />
        </section>
    );
};

export default GodProfilePic;
