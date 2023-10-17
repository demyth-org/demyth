import React from "react";
import Footer from "../../components/Footer";
import Header from "../../components/header/Header";

const AboutLayout = ({ children }: { children: React.ReactNode }) => {
    return (
        <main className="mx-auto flex w-full max-w-10xl flex-col items-center justify-center">
            <Header />
            {children}
            <Footer />
        </main>
    );
};

export default AboutLayout;
