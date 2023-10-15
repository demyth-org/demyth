import React from "react";
import Image from "next/image";
import egyptian1 from "../../../public/images/about/egyptian_1.jpg";

const AboutHero = () => {
    return (
        <section
            id="about"
            className="scroll-mt-[9.2rem] flex flex-col md:flex-row justify-start items-center md:gap-x-4 w-full"
        >
            <div className="flex flex-1 flex-col items-center justify-center text-center w-full">
                <div className="flex flex-1 flex-row justify-between items-center w-full h-auto">
                    <h1 className="flex-1 sm:text-6xl text-4xl sm:leading-[80px] md:leading-[100px] lg:leading-[120px] w-full text-shark-50">
                        The New Web3 <br className="" />
                        <span className="text-gradient font-blanka">MYTHOLOGY</span>
                        <br className="" /> Strategy <br className="sm:block hidden" />
                        Card Game
                    </h1>
                </div>
                <div className="items-center py-4 md:pt-0 border-b sm:border-b-2 border-dashed border-shark-800 w-[1rem] sm:w-[2rem]"></div>
                <p className="text-[1rem] sm:text-[1.2rem] leading-[1.8rem] mt-6">
                    Embark on an <span className="text-shark-50">epic journey</span> as a hero,
                    <br className="sm:block hidden" /> pray to your gods, gather mythological creatures
                    <br className="sm:block hidden" /> and engage in merciless warfare against other players.
                </p>
            </div>
            <div className="flex flex-1 justify-center items-center w-full h-full md:w-1/2 md:mt-0 mt-10 relative">
                <Image
                    src={egyptian1}
                    alt="egyptian1"
                    priority={true}
                    width={682}
                    height={682}
                    placeholder="blur"
                    sizes="(min-width: 1520px) 682px, (min-width: 780px) 45.83vw, calc(100vw - 36px)"
                    className="w-full max-w-[450px] h-auto rounded-xl mx-auto relative z-[5]"
                />
                <div className="absolute z-[0] w-full h-[75%] rounded-xl -top-5 left-0 black__gradient" />
                <div className="absolute z-[2] w-full h-full rounded-xl top-0 left-0 pink__gradient" />
                <div className="absolute z-[1] w-full h-[35%] rounded-xl top-1/2 left-0 brown__gradient" />
            </div>
        </section>
    );
};

export default AboutHero;
