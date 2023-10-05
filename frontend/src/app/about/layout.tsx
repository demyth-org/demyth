import React from "react";
import AboutHeader from "../../components/aboutHeader";

const AboutLayout = ({ children }: { children: React.ReactNode }) => {
    return (
        <main>
            <AboutHeader />
            {children}
        </main>
    );
};

export default AboutLayout;
