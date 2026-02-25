
/** @type {import('tailwindcss').Config} */
export default {
  content: [
    "./index.html",
    "./**/*.{js,ts,jsx,tsx}",
  ],
  theme: {
    extend: {
      fontFamily: {
        // Use CSS variables defined in index.css for a single source of truth
        sans: ['var(--font-futura)'],
        rheiborn: ['var(--font-rheiborn)'],
        space: ['var(--font-space)'],
      },
      fontWeight: {
        'light': '300',
        'normal': '400',
        'medium': '500',
        'semibold': '600',
        'bold': '700',
        'extrabold': '800',
        'black': '900', 
      },
      colors: {
        brand: {
          black: '#000000',
          dark: '#111111',
          gray: '#333333',
        }
      },
      keyframes: {
        'splash-fade-spin-out': {
          '0%': { transform: 'scale(0.9) rotate(0deg)', opacity: '0' },
          '25%': { transform: 'scale(1) rotate(0deg)', opacity: '1' },
          '100%': { transform: 'scale(0.9) rotate(720deg)', opacity: '0' },
        },
        'fade-in': { '0%': { opacity: '0' }, '100%': { opacity: '1' } },
        'fade-in-up': { '0%': { opacity: '0', transform: 'translateY(20px)' }, '100%': { opacity: '1', transform: 'translateY(0)' } },
        'scroll': { '0%': { transform: 'translateX(0)' }, '100%': { transform: 'translateX(-50%)' } },
      },
      animation: {
        'splash-fade-spin-out': 'splash-fade-spin-out 2s linear forwards',
        'fade-in': 'fade-in 0.5s ease-out forwards',
        'fade-in-up': 'fade-in-up 0.6s ease-out forwards',
        'scroll': 'scroll 25s linear infinite',
      },
    },
  },
  plugins: [],
}
