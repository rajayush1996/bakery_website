import type { Config } from "tailwindcss";

const config: Config = {
  content: [
    "./src/pages/**/*.{js,ts,jsx,tsx,mdx}",
    "./src/components/**/*.{js,ts,jsx,tsx,mdx}",
    "./src/app/**/*.{js,ts,jsx,tsx,mdx}",
  ],
  theme: {
    extend: {
      colors: {
        primary: "#E91E63",
        "primary-dark": "#C2185B",
        secondary: "#5D4037",
        "secondary-light": "#8D6E63",
        accent: "#FFD700",
        cream: "#FFF8F0",
        "dark-brown": "#3E2723",
        "light-pink": "#FCE4EC",
      },
      fontFamily: {
        heading: ["Georgia", "serif"],
        dancing: ["Dancing Script", "cursive"],
      },
    },
  },
  plugins: [],
};
export default config;
