import React from "react";
import Header from "../../components/header/Header";
import Footer from "../../components/Footer";

const AboutLayout = ({ children }: { children: React.ReactNode }) => {
    return (
        <main className="flex flex-col w-full max-w-10xl justify-center items-center mx-auto">
            <Header />
            <div className="mt-24 sm:mt-20 md:tall:mt-24 p-4 md:p-8 justify-center items-center w-full mx-auto text-shark-50/70">
                {children}
            </div>
            <Footer />
        </main>
    );
};

export default AboutLayout;
