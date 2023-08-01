/** @type {import('tailwindcss').Config} */
export default {
  content: ["./index.html", "./src/**/*.{js,ts,jsx,tsx}"],
  theme: {
    fontFamily: {
      dancing: ["Dancing Script", "cursive"],
      raleway: ["Raleway", "sans-serif"],
    },
    extend: {
      colors: {
        eerieBlack: "#1C1B19",
        floralWhite: "#FAF6EF"
      },
    },
  },
  plugins: [],
};
