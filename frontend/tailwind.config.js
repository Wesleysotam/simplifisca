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
        textSecondary: '#616572',
        bgSecondary: '#EDF0F2',
        bgMain: '#F5F7F8',
      },
      fontFamily: {
        sans: ['Inter', 'sans-serif'],
      }
    },
  },
  plugins: [],
}
