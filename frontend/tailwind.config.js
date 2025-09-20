/** @type {import('tailwindcss').Config} */
export default {
  content: ["./index.html", "./src/**/*.{ts,tsx}"],
  theme: {
    extend: {
      colors: {
        primary: {
          50: '#edfff5',
          100: '#d6ffe8',
          200: '#adffd3',
          300: '#6bffb7',
          400: '#22ee92',
          500: '#07cf77',
          600: '#00a05e',
          700: '#017d4d',
          800: '#075f3f',
          900: '#084d35'
        }
      }
    }
  },
  plugins: [require('@tailwindcss/line-clamp')]
}

