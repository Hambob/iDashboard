/** @type {import('tailwindcss').Config} */
module.exports = {
  content: ["./App.{js,jsx,ts,tsx}", "./src/**/*.{js,jsx,ts,tsx}"],
  theme: {
    extend: {
      colors: {
        mainColor: "#37BD6B",
        secondColor: "#FEAC56",
        textColor: "#6A6D7C",
      },
      fontFamily: {
        Cairo: ["Cairo"],
        CairoBold: ["CairoBold"],
      },
    },
  },
  plugins: [],
};
