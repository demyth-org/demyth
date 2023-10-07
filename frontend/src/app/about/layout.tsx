import React from "react";
import Header from "../../components/Header";
import Footer from "../../components/Footer";

const AboutLayout = ({ children }: { children: React.ReactNode }) => {
    return (
        <main className="flex flex-col max-w-10xl justify-center items-center mx-auto">
            <Header />
            <div className="mt-20 md:mt-24 md:p-8 p-4 justify-center items-center w-full mx-auto">{children}</div>
            <Footer />
        </main>
    );
};

export default AboutLayout;
