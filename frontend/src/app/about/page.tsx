/* eslint-disable react/no-unescaped-entities */
import React from "react";
import { AboutHero, AboutFeatures, AboutCodex, AboutContact, AboutCTA } from "../../components/about";
import SectionVerticalDivider from "../../components/SectionVerticalDivider";

//TODO add a ss style to the config
const About = () => {
    return (
        <section className="relative flex flex-col items-center justify-center max-sm:pt-4 gap-y-24 md:gap-y-24">
            <AboutHero />
            <AboutCTA />
            <SectionVerticalDivider />
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
