/** @type {import('tailwindcss').Config} */
export default {
  content: [
    "./index.html",
    "./src/**/*.{js,ts,jsx,tsx}",
  ],
  theme: {
    extend: {
      colors: {
        "green-light": "#36a6ba",
        "green-dark": "#6f979e",
      }
    },
  },
  plugins: [],
}

