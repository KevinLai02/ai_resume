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
        custom: {
          brown: {
            100: "#BDAE8C",
            200: "#8C705A",
          },
          blue: {
            100: "#DBE7EF",
            200: "#38BDF8",
            300: "#66AAF9",
            400: "#366092",
            500: "#17375E",
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
