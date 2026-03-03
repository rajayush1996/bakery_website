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
        primary: "#D64B7A",
        "primary-dark": "#B03A63",
        secondary: "#4A4A5A",
        "secondary-light": "#6B6B7B",
        accent: "#E8A838",
        cream: "#FAFAFA",
        "dark-brown": "#1a1a2e",
        "light-pink": "#FFF0F5",
      },
      fontFamily: {
        heading: ["Playfair Display", "Georgia", "serif"],
        body: ["Inter", "system-ui", "-apple-system", "sans-serif"],
      },
    },
  },
  plugins: [],
};
export default config;
