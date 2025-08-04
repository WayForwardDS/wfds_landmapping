/** @type {import('tailwindcss').Config} */
export default {
 darkMode: "class", // Enable class-based dark mode
content: ["./index.html", "./src/**/*.{js,ts,jsx,tsx}"],
  theme: {
    extend: {
      colors: {
        primary: '#007bff',
        dark: '#1a1a1a',
        light: '#f4f4f4',
      }
    },
  },
  plugins: [],
}
