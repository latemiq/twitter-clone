/** @type {import('tailwindcss').Config} */
module.exports = {
  content: ["./src/**/*.{js,jsx,ts,tsx}", "./public/src/index.html"],
  theme: {
    screens: {
      sm: "500px",
      md: "1000px",
    },
    extend: {},
  },
  plugins: [],
};
