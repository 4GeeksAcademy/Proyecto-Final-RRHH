/** @type {import('tailwindcss').Config} */
export default {
  content: [
    "./index.html",
    "./src/**/*.{js,ts,jsx,tsx}",
  ],
  darkMode: 'class',  // esto es , lo que hace que funcione, es importante
  theme: {
    extend: {},
  },
  plugins: [],
}