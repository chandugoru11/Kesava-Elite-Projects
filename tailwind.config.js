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
          DEFAULT: '#1D4ED8',
          dark: '#1E3A8A',
          light: '#3B82F6',
        },
        'industrial-gold': {
          DEFAULT: '#D4AF37',
          light: '#FFD700',
          dark: '#B8860B',
        },
        'tech-dark': '#0F172A',
      },
      borderRadius: {
        '4xl': '2rem',
        '5xl': '3rem',
        '6xl': '4rem',
      },
      animation: {
        'marquee-l': 'marquee-l 8s linear infinite',
        'marquee-r': 'marquee-r 8s linear infinite',
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
      backgroundImage: {
        'shimmer-gradient': 'linear-gradient(90deg, #1e3a8a 0%, #3b82f6 50%, #1e3a8a 100%)',
      },
    },
  },
  plugins: [],
}