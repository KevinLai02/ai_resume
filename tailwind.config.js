/** @type {import('tailwindcss').Config} */
import { nextui } from "@nextui-org/react";
module.exports = {
  content: [
    "./src/**/*.{js,ts,jsx,tsx,mdx}",
    "./node_modules/@nextui-org/theme/dist/**/*.{js,ts,jsx,tsx}",
  ],
  theme: {
    extend: {
      colors: {
        primary: { 100: "#F5E9D6" },
        "main-gray": "#809BA8",
        "main-earth": "#F5F0EA",
        brown: {
          100: "#8C705A",
        },
        custom: {
          blue: {
            100: "#38BDF8",
            200: "#66AAF9",
          },
          red: {
            100: "#F98D8D",
          },
        },
      },
    },
  },
  darkMode: "class",
  plugins: [nextui()],
};
