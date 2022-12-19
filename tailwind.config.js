/** @type {import('tailwindcss').Config} */
module.exports = {
  darkMode: "class",
  content: [
    "./assets/**/*.css",
    "./components/*.{vue,js}",
    "./components/**/*.{vue,js}",
    "./content/*.md",
    "./pages/*.vue",
    "./layouts/*.vue",
    "./pages/**/*.vue",
    "./plugins/**/*.{js,ts}",
  ],
  theme: {
    extend: {
      fontFamily: {
        arvo: ["Arvo", "serif"],
        lora: ["Lora", "serif"],
        qwitch: ["Qwitcher Grypen", "cursive"],
       },
    },
  },
  plugins: [require('@tailwindcss/typography')],
}
