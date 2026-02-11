
/** @type {import('tailwindcss').Config} */
export default {
  content: [
    "./index.html",
    "./**/*.{js,ts,jsx,tsx}",
  ],
  theme: {
    extend: {
      colors: {
        'elite-blue': {
          DEFAULT: '#0056b3',
          dark: '#003d80',
          light: '#3b82f6',
        },
        'innovation-orange': {
          DEFAULT: '#ff9800',
          hover: '#e68900',
          light: '#fff4e5',
        },
        'tech-dark': '#1a1a1a',
        'tech-light': '#f4f7f6',
      },
      borderRadius: {
        '4xl': '2rem',
        '5xl': '3rem',
        '6xl': '4rem',
      },
      animation: {
        'marquee-l': 'marquee-l 35s linear infinite',
        'marquee-r': 'marquee-r 35s linear infinite',
        'shimmer': 'shimmer 3s linear infinite',
        'scan': 'scan 4s cubic-bezier(0.4, 0, 0.2, 1) infinite',
        'fade-in': 'fade-in 0.3s ease-out forwards',
        'scale-up': 'scale-up 0.3s cubic-bezier(0.16, 1, 0.3, 1) forwards',
      },
      keyframes: {
        'marquee-l': {
          '0%': { transform: 'translateX(0)' },
          '100%': { transform: 'translateX(-50%)' },
        },
        'marquee-r': {
          '0%': { transform: 'translateX(-50%)' },
          '100%': { transform: 'translateX(0)' },
        },
        'shimmer': {
          '0%': { backgroundPosition: '-200% 0' },
          '100%': { backgroundPosition: '200% 0' },
        },
        'scan': {
          '0%': { transform: 'translateX(-10%)', opacity: '0' },
          '10%': { opacity: '1' },
          '90%': { opacity: '1' },
          '100%': { transform: 'translateX(1100%)', opacity: '0' },
        },
        'fade-in': {
          'from': { opacity: '0' },
          'to': { opacity: '1' },
        },
        'scale-up': {
          'from': { transform: 'scale(0.95)', opacity: '0' },
          'to': { transform: 'scale(1)', opacity: '1' },
        },
      },
    },
  },
  plugins: [],
}
