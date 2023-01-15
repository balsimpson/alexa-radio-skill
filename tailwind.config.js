/** @type {import('tailwindcss').Config} */
module.exports = {
  content: [
    "./assets/**/*.css",
    "./components/*.{vue,js}",
    "./components/**/*.{vue,js}",
    "./content/*.md",
    "./pages/*.vue",
    "./pages/**/*.vue",
    "./layouts/*.vue",
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

    keyframes: {
      spinning: {
        '0%': { transform: 'rotate(0deg)' },
        '100%': { transform: 'rotate(360deg)' },
      },
      wiggle: {
        '0%, 100%': { transform: 'rotate(-3deg)' },
        '50%': { transform: 'rotate(3deg)' },
      },
      fadeIn: {
        '0%': { opacity: 0 },
        '100%': { opacity: 1 }
      },
      fadeInRight: {
        '0%': { transform: 'translateX(30px)', opacity: 0 },
        '100%': { transform: 'translateX(0)', opacity: 1 },
      },
      slideInFromLeft: {
        '0%': { transform: 'translateX(-100%)' },
        '100%': { transform: 'translateX(0)' }
      },
      expandAndFadeIn: {
        '0%': { transform: 'scale(0)', opacity: 0 },
        '100%': { transform: 'scale(1)', opacity: 1 }
      },
      slideInFromTopAndFadeIn: {
        '0%': { transform: 'translateY(-100%)', opacity: 0 },
        '100%': { transform: 'translateY(0)', opacity: 1 }
      }
    },

    animation: {
      wiggle: 'wiggle 1s ease-in-out infinite',
      spinning: 'spinning 1s linear infinite',
      'spin-slow': 'spin 3s linear infinite',
      fadeIn: 'fadeIn 1s ease-in-out',
      fadeInRight: 'fadeInRight 1s ease-in-out',
      slideInFromLeft: 'slideInFromLeft 1s ease-in-out',
      expandAndFadeIn: 'expandAndFadeIn 1s ease-in-out',
      slideInFromTopAndFadeIn: 'slideInFromTopAndFadeIn 1s ease-in-out'

    }

  },
  plugins: [require('@tailwindcss/typography')],
}
