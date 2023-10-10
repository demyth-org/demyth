import type { Config } from "tailwindcss";

const config: Config = {
    content: [
        "./src/pages/**/*.{js,ts,jsx,tsx,mdx}",
        "./src/components/**/*.{js,ts,jsx,tsx,mdx}",
        "./src/app/**/*.{js,ts,jsx,tsx,mdx}",
    ],
    theme: {
        extend: {
            screens: {
                tall: { raw: "(min-height: 1230px)" },
                // => @media (min-height:  1230px) { ... }
            },
            boxShadow: {
                xs: "0px 1px 2px 0px rgba(16, 24, 40, 0.05)",
            },
            maxWidth: {
                "10xl": "1440px",
            },
            fontFamily: {
                inter: ["Inter", "sans-serif"],
                spaceGrotesk: ["Space Grotesk", "sans-serif"],
            },
            borderRadius: {
                10: "10px",
            },
            scale: {
                25: "0.25",
            },
            colors: {
                transparent: "transparent",
                current: "currentColor",
                dimWhite: "rgba(255, 255, 255, 0.7)",
                //60
                shark: {
                    "50": "#f2f8f9",
                    "100": "#ddebf0",
                    "200": "#bfd9e2",
                    "300": "#93becd",
                    "400": "#5f9bb1",
                    "500": "#447f96",
                    "600": "#3b697f",
                    "700": "#355769",
                    "800": "#324a58",
                    "900": "#2d404c",
                    DEFAULT: "#1a2832",
                },
                //30
                astral: {
                    "50": "#f0f9fb",
                    "100": "#d9f1f4",
                    "200": "#b8e2e9",
                    "300": "#86ccda",
                    DEFAULT: "#67b9cb",
                    "500": "#3291a8",
                    "600": "#2c768e",
                    "700": "#2a6074",
                    "800": "#2a5060",
                    "900": "#264553",
                    "950": "#152b37",
                },
                //10
                gold: {
                    "50": "#ffffe7",
                    "100": "#feffc1",
                    "200": "#fffd86",
                    "300": "#fff441",
                    "400": "#ffe60d",
                    DEFAULT: "#ffd700",
                    "600": "#d19e00",
                    "700": "#a67102",
                    "800": "#89580a",
                    "900": "#74480f",
                    "950": "#442604",
                },
            },
        },
    },
    plugins: [],
};
export default config;
