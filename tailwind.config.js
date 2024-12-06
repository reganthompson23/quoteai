/** @type {import('tailwindcss').Config} */
export default {
  content: ['./index.html', './src/**/*.{js,ts,jsx,tsx}'],
  theme: {
    extend: {
      textShadow: {
        tight: '0 2px 4px rgba(0, 0, 0, 0.9), 1px 1px 3px rgba(0, 0, 0, 0.9)',
      },
      keyframes: {
        scroll: {
          '0%': { transform: 'translateX(0)' },
          '100%': { transform: 'translateX(-50%)' },
        },
      },
      animation: {
        scroll: 'scroll 30s linear infinite',
        'scroll-fast': 'scroll 20s linear infinite',
      },
    },
  },
  plugins: [
    require('@tailwindcss/forms'),
    function({ addUtilities }) {
      const newUtilities = {
        '.text-shadow-tight': {
          textShadow: '0 2px 4px rgba(0, 0, 0, 0.9), 1px 1px 3px rgba(0, 0, 0, 0.9)',
        },
      };
      addUtilities(newUtilities);
    },
  ],
};