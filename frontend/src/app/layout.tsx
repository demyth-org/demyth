import "./globals.css";
import type { Metadata } from "next";
import { Inter, Space_Grotesk } from "next/font/google";
import Header from "../components/Header";

const inter = Inter({ subsets: ["latin"] });
const spaceGrotesk = Space_Grotesk({ subsets: ["latin"], weight: ["300", "400", "500", "600", "700"] });

export const metadata: Metadata = {
    title: "Demyth",
    description: "Play Demyth, a Web3 RPG-style based on mythology",
};

export default function RootLayout({ children }: { children: React.ReactNode }) {
    return (
        <html lang="en">
            <body className={`${spaceGrotesk.className} max-w-9xl dark:bg-shark dark:text-shark-50 .h-my-screen`}>
                {children}
            </body>
        </html>
    );
}
