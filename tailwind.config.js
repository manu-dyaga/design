/** @type {import('tailwindcss').Config} */
export default {
  content: ['./index.html', './src/**/*.{js,jsx}'],
  theme: {
    extend: {
      colors: {
        maroon: {
          DEFAULT: '#6E1E36',
          dark: '#4E1526',
          light: '#8C2A47',
        },
        gold: {
          DEFAULT: '#C9A24B',
          light: '#E4C978',
          dark: '#A9832F',
        },
        cream: '#FAF3E9',
        ink: '#2B2320',
      },
      fontFamily: {
        display: ['"Playfair Display"', 'serif'],
        body: ['"Poppins"', 'sans-serif'],
      },
      backgroundImage: {
        'paisley': "url(\"data:image/svg+xml,%3Csvg xmlns='http://www.w3.org/2000/svg' width='60' height='60'%3E%3Cpath d='M30 5c8 0 15 7 15 15 0 6-3 9-8 12 6 1 10 5 10 11 0 8-8 15-17 15S13 51 13 43c0-6 4-10 10-11-5-3-8-6-8-12C15 12 22 5 30 5z' fill='none' stroke='%23C9A24B' stroke-width='0.6' opacity='0.15'/%3E%3C/svg%3E\")",
      },
    },
  },
  plugins: [],
}
