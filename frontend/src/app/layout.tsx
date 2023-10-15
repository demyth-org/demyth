import type { Metadata } from "next";
import { blanka, spaceGrotesk } from "./fonts/fonts";
import "./globals.css";

export const metadata: Metadata = {
    title: "Demyth",
    description: "Play Demyth, a Web3 strategy card game based on mythology",
};

export default function RootLayout({ children }: { children: React.ReactNode }) {
    return (
        <html lang="en" className={`${spaceGrotesk.variable} ${blanka.variable}`}>
            <body className={`h-my-screen bg-shark font-spaceGrotesk text-shark-50`}>{children}</body>
        </html>
    );
}
