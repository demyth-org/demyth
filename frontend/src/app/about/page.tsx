/* eslint-disable react/no-unescaped-entities */
import SectionVerticalDivider from "../../components/SectionVerticalDivider";
import { AboutCTA, AboutCodex, AboutContact, AboutFeatures, AboutHero } from "../../components/about";

const About = () => {
    return (
        <section className="relative mx-auto flex w-full flex-col items-center justify-center px-4 text-shark-50/70 md:px-8">
            <div
                id="about"
                className="section-min-height relative mt-24 flex w-full scroll-mt-24 flex-col items-center justify-evenly"
            >
                <AboutHero />
                <AboutCTA />
            </div>
            <AboutFeatures />
            <AboutCodex />
            <AboutContact />
        </section>
    );
};

export default About;
