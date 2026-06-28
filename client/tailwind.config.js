/** @type {import('tailwindcss').Config} */
module.exports = {
  content: [
    "./src/**/*.{js,jsx,ts,tsx}",
  ],
  theme: {
    extend: {
      animation: {
        'slide-in': 'slideIn 0.25s ease-out',
        'fade-in' : 'fadeIn 0.35s ease-out',
      },
      keyframes: {
        slideIn: {
          '0%'  : { opacity: '0', transform: 'translateY(-8px)' },
          '100%': { opacity: '1', transform: 'translateY(0)'    }
        },
        fadeIn: {
          '0%'  : { opacity: '0' },
          '100%': { opacity: '1' }
        }
      },
      fontFamily: {
        sans: ['DM Sans', 'sans-serif'],
        mono: ['DM Mono', 'monospace'],
      }
    },
  },
  plugins: [],
}
