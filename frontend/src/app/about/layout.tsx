import React from "react";
import Header from "../../components/Header";
import Footer from "../../components/Footer";

const AboutLayout = ({ children }: { children: React.ReactNode }) => {
    return (
        <main className="flex flex-col">
            <Header />
            {children}
            <Footer />
        </main>
    );
};

export default AboutLayout;
