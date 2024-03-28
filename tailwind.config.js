/** @type {import('tailwindcss').Config} */
module.exports = {
  content: [
    "./src/**/*.{js,ts,jsx,tsx,mdx}",
  ],
  theme: {
    extend: {
      colors: {
        'main-gray':'#809BA8',
        'main-earth':'#F5F0EA'
      },
    },
  },
  plugins: [],
}