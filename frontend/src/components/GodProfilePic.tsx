import React from "react";
import Image from "next/image";
import godPic from "../../public/images/Roles/hero1.png";

const GodProfilePic = () => {
    return (
        <section className="m-auto">
            <Image
                className="border-2 border-shark drop-shadow-xl shadow-black rounded-2xl mx-auto mt-8"
                src={godPic}
                alt="anHero"
                quality={100}
                priority={true}
            />
        </section>
    );
};

export default GodProfilePic;
