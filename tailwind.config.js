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
        background: '#0a0a0a',
        foreground: '#ffffff',
        primary: {
          DEFAULT: '#0095f6',
          hover: '#1877f2',
          dark: '#0077c2',
          glow: 'rgba(0, 149, 246, 0.15)',
        },
        secondary: {
          DEFAULT: '#111111',
          light: '#161616',
          dark: '#0a0a0a',
          elevated: '#1c1c1c',
        },
        accent: {
          teal: '#00d4aa',
          gold: '#f5c518',
          purple: '#8b5cf6',
        },
        border: {
          DEFAULT: '#262626',
          hover: '#363636',
          subtle: '#1f1f1f',
        },
      },
      fontFamily: {
        sans: ['-apple-system', 'BlinkMacSystemFont', 'Segoe UI', 'Roboto', 'Helvetica Neue', 'Arial', 'sans-serif'],
      },
      boxShadow: {
        'glow': '0 0 20px rgba(0, 149, 246, 0.2)',
        'glow-sm': '0 0 10px rgba(0, 149, 246, 0.15)',
      },
      borderRadius: {
        'sm': '6px',
        'md': '8px',
        'lg': '12px',
        'xl': '16px',
      },
    },
  },
  plugins: [],
}
