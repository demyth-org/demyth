/* eslint-disable react/no-unescaped-entities */
import React from "react";
import Link from "next/link";
import Image from "next/image";
import egyptian1 from "../../../public/images/about/egyptian_1.jpg";
import GodProfilePic from "../../components/GodProfilePic";
import styles from "../../lib/styles";

//TODO add a ss style to the config
//WIP image resizing....
const About = () => {
    return (
        <section
            id="about"
            className="scroll-mt-[100rem] relative flex md:flex-row flex-col items-center justify-center border-2 border-red-500"
        >
            <div
                className={`flex-1 flex flex-col justify-between min-h-full items-center text-center sm:px-16 px-4 border-2 border-green-500`}
            >
                <div className="flex flex-1 flex-row justify-between items-center w-full h-auto">
                    <h1 className="sm:text-6xl text-4xl sm:leading-[120px] leading-[80px] w-full">
                        The New Web3 <br className="sm:block hidden" />
                        <span className="text-gradient font-semibold">MYTHOLOGY</span>
                        <br className="sm:block hidden" /> Strategy <br className="sm:block hidden" />
                        Card Game
                    </h1>
                </div>
                <div className="border-b sm:border-b-2 border-dashed border-shark-800 w-[1rem] sm:w-[2rem]"></div>
                <p className={`text-shark-50/70 text-[1rem] sm:text-[1.2rem] leading-[1.8rem] mt-6`}>
                    Embark on an <span className="text-shark-50">epic journey</span> as a hero,
                    <br className="sm:block hidden" /> pray to your gods, gather mythological creatures and engage in
                    merciless warfare against other players.
                </p>
            </div>
            <div className={`flex flex-1 justify-center items-center md:my-0 my-10 relative border-2 border-blue-500`}>
                <Image
                    src={egyptian1}
                    alt="egyptian1"
                    priority={false}
                    placeholder="blur"
                    height={500}
                    className="w-auto h-auto relative z-[5]"
                />
            </div>
            {/* <div className="absolute z-[0] w-[40%] h-[35%] top-0 pink__gradient" />
                <div className="absolute z-[1] w-[80%] h-[80%] rounded-full bottom-40 white__gradient" />
                <div className="absolute z-[0] w-[50%] h-[50%] right-20 bottom-20 blue__gradient" /> */}
            {/* <p>
                Assume the role of a hero, assemble a diverse fellowship, and engage in mythological warfare against
                other players. Balance bonuses and penalties for a tactical edge in battles!
            </p>
            <p>
                Unleash the Power of Mythology Dive into a world where ancient myths and gods shape your destiny. Choose
                your mythology and align yourself with a god, determining your character's role and destiny.
            </p>
            <p>
                Forge Unlikely Alliances In DEMYTH, the bonds you forge are as powerful as the weapons you wield.
                Assemble a fellowship with creatures from across all mythologies. Play as a pharaoh warrior of Ra and
                recruit the legendary Pegasus of Zeus, or enlist the fearsome Cerberus of Hades to aid you on your
                quests.
            </p>
            <p>
                PvP and Resource Battles Engage in intense player-versus-player combat and strategic resource battles.
                Every victory earns you resources, paving the way for the evolution of your fellowship, the expansion of
                your domain, and the advancement of your hero.
            </p>
            <p>
                Elevate Your Hero's Potential Level up your hero, enhancing their strength, dexterity, and abilities.
                With every conquest, your hero becomes more formidable, inching closer to godhood.
            </p>
            <p>
                NFTs and Marketplace Experience true ownership with our unique NFT system. Your hero and creatures are
                yours to collect, trade, and showcase. Explore our integrated marketplace for exclusive items,
                creatures, and more.
            </p>
            <p>
                Join Us on this Epic Journey Embark on a legendary adventure like no other. [Your Game's Name] invites
                you to become a part of a vibrant community of myth-makers, strategists, and conquerors.
            </p>
            [Play Now] | [Join the Community] | [Explore the Marketplace] */}
            {/* <GodProfilePic />
            <GodProfilePic />
            <GodProfilePic /> */}
        </section>
    );
};

export default About;
