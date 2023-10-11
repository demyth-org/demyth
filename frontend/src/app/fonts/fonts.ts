import { Space_Grotesk } from "next/font/google";
import Blanka_Regular from "next/font/local";

export const spaceGrotesk = Space_Grotesk({
    subsets: ["latin"],
    weight: ["300", "400", "500", "600", "700"],
    display: "swap",
    variable: "--font-space-grotesk",
});

export const blanka = Blanka_Regular({
    src: "./Blanka-Regular.otf",
    display: "swap",
    variable: "--font-blanka",
});
