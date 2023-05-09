/** @type {import('tailwindcss').Config} */
module.exports = {
  content: ["./App.{js,jsx,ts,tsx}", "./src/**/*.{js,jsx,ts,tsx}"],
  theme: {
    extend: {
      colors: {
        mainColor: "#37BD6B",
        secondColor: "#FEAC56",
        textColor: "#6A6D7C",
        redBtn: "#E74C3C",
        blackColor: "#171215",
        grayColor: "#D9D9D9",
        grayDarkColor: "#34495E",
        blueColor: "#3498DB",
        bgGray: "#95A5A6",
      },
      fontFamily: {
        Cairo: ["Cairo"],
        CairoBold: ["CairoBold"],
      },
    },
  },
  plugins: [],
};
