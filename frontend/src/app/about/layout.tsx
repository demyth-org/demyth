import React from "react";
import Header from "../../components/header/Header";
import Footer from "../../components/Footer";
import { clsx } from "clsx";

const AboutLayout = ({ children }: { children: React.ReactNode }) => {
    return (
        <main className="mx-auto flex w-full max-w-10xl flex-col items-center justify-center">
            <Header />
            <div
                className={clsx(
                    "mx-auto mt-24 w-full items-center justify-center p-4 text-shark-50/70 ",
                    "sm:mt-20 md:px-8 md:tall:mt-24",
                )}
            >
                {children}
            </div>
            <Footer />
        </main>
    );
};

export default AboutLayout;
