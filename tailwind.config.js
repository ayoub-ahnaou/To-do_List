/** @type {import('tailwindcss').Config} */
module.exports = {
  content: ["./src/**/*.{html,js}"],
  theme: {
    extend: {
      colors: {
        orangeColor: "#FFA373",
        orangeBg: "rgba(255, 163, 115, 0.1)",
        redColor: "#FF4040",
        redBg: "rgba(255, 64, 64, 0.1)",
        greenColor: "#1FD492",
        greenBg: "rgba(31, 212, 146, 0.1)",
        lightGrayColor: "#F5F5F5",
        mediumGrayColor: "#E0E0E0",
        darkGrayColor: "#BDBDBD",
      }
    },
  },
  plugins: [],
}

