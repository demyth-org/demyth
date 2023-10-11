import "./globals.css";
import type { Metadata } from "next";
import { spaceGrotesk, blanka } from "./fonts/fonts";

export const metadata: Metadata = {
    title: "Demyth",
    description: "Play Demyth, a Web3 strategy card game based on mythology",
};

export default function RootLayout({ children }: { children: React.ReactNode }) {
    return (
        <html lang="en" className={`${spaceGrotesk.variable} ${blanka.variable}`}>
            <body className={`font-spaceGrotesk dark:bg-shark dark:text-shark-50 h-my-screen`}>{children}</body>
        </html>
    );
}
