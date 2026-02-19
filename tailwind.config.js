
/** @type {import('tailwindcss').Config} */
export default {
  content: [
    "./index.html",
    "./**/*.{js,ts,jsx,tsx}",
  ],
  theme: {
    extend: {
      fontFamily: {
        // Body Font: Prioritize Futura (TitleCase), then Futura LC (Lowercase), then Jost
        sans: ['Futura', '"Futura LC"', 'Jost', 'sans-serif'],
        
        // Display/Heading Fonts: Prioritize Rheiborn (TitleCase), then Rheiborn LC (Lowercase), then Antonio
        eurostile: ['"Rheiborn Sans Clean"', '"Rheiborn Sans Clean LC"', 'Antonio', 'sans-serif'],
        oswald: ['"Rheiborn Sans Clean"', '"Rheiborn Sans Clean LC"', 'Antonio', 'sans-serif'],
        heading: ['"Rheiborn Sans Clean"', '"Rheiborn Sans Clean LC"', 'Antonio', 'sans-serif'],
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
