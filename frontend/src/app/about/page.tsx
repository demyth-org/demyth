/* eslint-disable react/no-unescaped-entities */
import React from "react";
import { AboutHero, AboutFeatures, AboutCodex, AboutContact, AboutCTA } from "../../components/about";
import SectionVerticalDivider from "../../components/SectionVerticalDivider";

//TODO add a ss style to the config
const About = () => {
    return (
        <section className="relative flex flex-col items-center justify-center gap-y-24 md:gap-y-24 w-full ">
            <div className="relative flex flex-col items-center justify-center gap-y-8 md:gap-y-12 md:tall:justify-evenly md:tall:h-[90vh] w-full">
                <AboutHero />
                <AboutCTA />
                <SectionVerticalDivider />
            </div>
            <AboutFeatures />
            <AboutCodex />
            <AboutContact />
            [Play Now] | [Join the Community] | [Explore the Marketplace]
            {/* <GodProfilePic />
            <GodProfilePic />
            <GodProfilePic /> */}
        </section>
    );
};

export default About;
