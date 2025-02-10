/** @type {import('tailwindcss').Config} */
module.exports = {
  content: ["./src/**/*.{js,jsx,ts,tsx}"],
  theme: {
    extend: {
      fontFamily: {
        sans: ["Poppins", "sans-serif"], // Add Poppins as the default sans font
      },
      colors: {
        skyBlue: "#71839A",
        customBlack: "#0C0E11",
        lightGray: "#C3C3C3",
        darkBlue: "#606F83",
        extraDarkBlue: "#5E95E7",
        primary: {
          DEFAULT: "#647B9D",
          light: "#8494B0",
          dark: "#4A6285",
        },
      },
    },
  },
  plugins: [],
};
