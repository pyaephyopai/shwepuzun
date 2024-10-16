/** @type {import('tailwindcss').Config} */
export default {
  content: [
    "./index.html",
    "./src/**/*.{js,ts,jsx,tsx}",
  ],
  theme: {
    extend: {
      colors: {
        'primary': "#CD7649",
        'secondary': "#EBEBEB",
        "cta": "#fca311",
        "hcta": "#f0b049"
      },
    },
  },
  plugins: [],
}