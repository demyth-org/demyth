import React from "react";
import Image from "next/image";
import egyptian1 from "../../../public/images/about/egyptian_1.jpg";

const AboutHero = () => {
    return (
        <section className="flex w-full flex-col items-center justify-start md:flex-row md:justify-evenly md:gap-x-4">
            <div className="flex w-full flex-1 flex-col items-center justify-center text-center">
                <div className="flex h-auto w-full flex-1 flex-row items-center justify-between">
                    <h1 className="w-full flex-1 text-4xl text-shark-50 sm:text-6xl sm:leading-[80px] md:leading-[100px] lg:leading-[120px]">
                        The New Web3 <br className="" />
                        <span className="text-gradient font-blanka">MYTHOLOGY</span>
                        <br className="" /> Strategy <br className="hidden sm:block" />
                        Card Game
                    </h1>
                </div>
                <div className="w-[1rem] items-center border-b border-dashed border-shark-800 py-4 sm:w-[2rem] sm:border-b-2 md:pt-0"></div>
                <p className="mt-6 text-[1rem] leading-[1.8rem] sm:text-[1.2rem]">
                    Embark on an <span className="text-shark-50">epic journey</span> as a hero,
                    <br className="hidden sm:block" /> pray to your gods, gather mythological creatures
                    <br className="hidden sm:block" /> and engage in merciless warfare against other players.
                </p>
            </div>
            <div className="relative flex w-full flex-1 items-center justify-center ">
                <Image
                    src={egyptian1}
                    alt="egyptian1"
                    priority={true}
                    width={682}
                    height={682}
                    placeholder="blur"
                    sizes="(min-width: 1520px) 682px, (min-width: 780px) 45.83vw, calc(100vw - 36px)"
                    className="relative z-[5] mx-auto h-auto w-full max-w-[450px] rounded-xl"
                />
                <div className="black__gradient absolute -top-5 left-0 z-[0] h-[75%] w-full rounded-xl" />
                <div className="pink__gradient absolute left-0 top-0 z-[2] h-full w-full rounded-xl" />
                <div className="brown__gradient absolute left-0 top-1/2 z-[1] h-[35%] w-full rounded-xl" />
            </div>
        </section>
    );
};

export default AboutHero;
