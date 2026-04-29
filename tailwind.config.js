/** @type {import('tailwindcss').Config} */
module.exports = {
  darkMode: 'class',
  content: [
    './pages/**/*.{js,ts,jsx,tsx,mdx}',
    './components/**/*.{js,ts,jsx,tsx,mdx}',
    './app/**/*.{js,ts,jsx,tsx,mdx}',
  ],
  theme: {
    extend: {
      colors: {
        background: '#000000',
        foreground: '#ffffff',
        primary: {
          DEFAULT: '#ff6b9d',
          hover: '#f06292',
          dark: '#e91e63',
        },
        secondary: {
          DEFAULT: '#121212',
          light: '#1a1a1a',
          dark: '#0a0a0a',
        },
      },
    },
  },
  plugins: [],
}
