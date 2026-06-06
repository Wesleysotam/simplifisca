/** @type {import('tailwindcss').Config} */
export default {
  content: [
    "./index.html",
    "./src/**/*.{js,ts,jsx,tsx}",
  ],
  theme: {
    extend: {
      colors: {
        primary: '#222ED2',
        highlight: '#9DFF74',
        dark: '#303236',
        'text-secondary': '#616572',
        'bg-secondary': '#EDF0F2',
        'bg-main': '#F5F7F8',
      },
      fontFamily: {
        sans: ['"Merriweather Sans"', 'sans-serif'],
      }
    },
  },
  plugins: [],
}
