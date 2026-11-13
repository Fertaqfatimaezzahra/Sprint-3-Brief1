/** @type {import('tailwindcss').Config} */
module.exports = {
  content: ["./index.html", "./src/**/*.js", "./ui.js"],
  theme: {
    extend: {
      // Thème NEUTRE de départ.
      // TODO (Partie 1) : remplacez ces valeurs par les couleurs et les polices de votre univers.
    colors: {
  brand: {
    DEFAULT: "#B91C1C",
    dark: "#7F1D1D",
    light: "rgb(188, 149, 231)",
  },
  ink: "#142638",
  muted: "#586779",
  ground: "#FAF3E5",
  line: "#24143F",
},
      fontFamily: {
        display: ["Arial", "sans-serif"],
        body: ["Arial", "sans-serif"],
        mono: ["Courier New", "monospace"],
      },
      borderRadius: {
        card: "20px",
      },
    },
  },
  plugins: [],
};
