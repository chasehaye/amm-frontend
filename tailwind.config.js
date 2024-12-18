// tailwind.config.js
/** @type {import('tailwindcss').Config} */
module.exports = {
  content: [
    "./index.html",
    "./src/**/*.{js,ts,jsx,tsx}",
  ],
  theme: {
    extend: {
      colors: {
      c1: '#1e1e1e',
      c2: '#a3784b',
      c3: '#fd0000',
      c4: '#72665b',
      c5: '#c3c3c3',
      c6: '#1a1714',
      },
    },
  },
  plugins: [],
}