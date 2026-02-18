/** @type {import('tailwindcss').Config} */
module.exports = {
  content: [
    "./app/**/*.{js,jsx,ts,tsx,mdx}",
    "./src/**/*.{js,jsx,ts,tsx,mdx}",
  ],
  theme: {
    screens: {
      sm: "500px",
      md: "1000px",
      xl: "1280px",
    },
    extend: {},
  },
  plugins: [],
};
