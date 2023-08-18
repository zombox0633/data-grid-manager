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
        floralWhite: "#FAF6EF",
        silver: "#B2AEA3",
        ashGray: "#C8CFC4",
        mint: "#53B88C",
        brunswickGreen: "#184742",
        brownSugar: "#B97045",
        oldGold: "#DBC066",
      },
    },
  },
  plugins: [],
};
