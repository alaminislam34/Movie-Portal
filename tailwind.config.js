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
        bgMovie: "url(../src/assets/moviebg.jpg)",
        backImg: "url(../src/assets/banner/bg.avif)",
        trending: "url(../src/assets/trendingBg.jpg)",
      },
    },
    fontFamily: {
      Yatra: ["Yatra One", "system-ui"],
    },
  },
  plugins: [require("daisyui")],
};
