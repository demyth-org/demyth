import React from "react";
import Header from "../../components/Header";
import Footer from "../../components/Footer";

const AboutLayout = ({ children }: { children: React.ReactNode }) => {
    return (
        <main className="flex flex-col max-w-10xl justify-center items-center mx-auto">
            <Header />
            <div className="mt-24 md:mt-28 p-8 justify-center items-center w-full mx-auto">{children}</div>
            <Footer />
        </main>
    );
};

export default AboutLayout;
