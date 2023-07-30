/** @type {import('tailwindcss').Config} */
export default {
  content: [
    "./index.html",
    "./src/**/*.{js,ts,jsx,tsx}",
  ],
  theme: {
    extend: {
      fontFamily: {
        'roboto-condensed': ['Roboto Condensed', 'sans-serif'],
      },
      minWidth: {
        'fill': '-webkit-fill-available',
      },
      textAlign: {
        'webkit-center': '-webkit-center',
      },
    },
  },
  plugins: [],
}

