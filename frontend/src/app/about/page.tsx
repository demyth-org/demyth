/* eslint-disable react/no-unescaped-entities */
import React from "react";
import Link from "next/link";
import GodProfilePic from "../../components/GodProfilePic";
const About = () => {
    return (
        <section className="mt-[6rem] relative flex flex-col">
            <p>
                <span className="text-gradient">DEMYTH</span> is an innovative web application that seamlessly
                integrates the power of Next.js and the versatility of Tailwind CSS to bring you a groundbreaking
                frontend experience. Paired with a robust backend powered by Nest.js, MongoDB, and blockchain
                technology, we're pushing the boundaries of what a Mythology RPG/strategy game can be.
            </p>
            <h1></h1>
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
            [Play Now] | [Join the Community] | [Explore the Marketplace]
            <GodProfilePic />
            <GodProfilePic />
            <GodProfilePic />
        </section>
    );
};

export default About;
