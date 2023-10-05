import React from "react";
import AboutHeader from "../../components/AboutHeader";
import GodProfilePic from "../../components/GodProfilePic";

const AboutLayout = ({ children }: { children: React.ReactNode }) => {
    return (
        <main>
            <AboutHeader />
            <GodProfilePic />
            {children}
        </main>
    );
};

export default AboutLayout;
