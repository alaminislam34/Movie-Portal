/** @type {import('tailwindcss').Config} */
export default {
  content: ["./index.html", "./src/**/*.{js,ts,jsx,tsx}"],
  theme: {
    extend: {
      colors: {
        primary: "#FF4444",
      },
      backgroundImage: {
        movie: "url(../src/assets/movies2.jpg)",
      },
    },
  },
  plugins: [require("daisyui")],
};
