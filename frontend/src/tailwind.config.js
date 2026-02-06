/** @type {import('tailwindcss').Config} */
export default {
  content: [
    "./index.html",
    "./src/**/*.{js,ts,jsx,tsx}",
  ],
  darkMode: 'class',
  theme: {
    extend: {
      colors: {
        'tni-green': '#2D5016',
        'tni-gold': '#D4AF37',
      }
    },
  },
  plugins: [],
}
