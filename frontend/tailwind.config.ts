import type { Config } from "tailwindcss";

const config: Config = {
    content: [
        "./src/pages/**/*.{js,ts,jsx,tsx,mdx}",
        "./src/components/**/*.{js,ts,jsx,tsx,mdx}",
        "./src/app/**/*.{js,ts,jsx,tsx,mdx}",
    ],
    theme: {
        extend: {
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
        },
    },
    plugins: [],
};
export default config;
