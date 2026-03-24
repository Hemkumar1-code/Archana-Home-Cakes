/** @type {import('tailwindcss').Config} */
module.exports = {
  content: [
    "./index.html",
    "./src/**/*.{js,ts,jsx,tsx}",
  ],
  theme: {
    extend: {
      colors: {
        brand: {
          dark: '#1A0F0A',       // Richer dark brown
          gold: '#C5A059',       // Classy mute gold
          cream: '#FDFBF7',      // Very soft cream
          light: '#FFFFFF',
          accent: '#E6C27A',
        }
      },
      fontFamily: {
        serif: ['"Playfair Display"', 'serif'],
        sans: ['"Inter"', 'sans-serif'],
      },
    },
  },
  plugins: [],
}
