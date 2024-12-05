/** @type {import('tailwindcss').Config} */
export default {
  content: ['./index.html', './src/**/*.{js,ts,jsx,tsx}'],
  theme: {
    extend: {
      textShadow: {
        tight: '0 1px 2px rgba(0, 0, 0, 0.8), 0 1px 1px rgba(0, 0, 0, 0.8)',
      },
    },
  },
  plugins: [
    require('@tailwindcss/forms'),
    function({ addUtilities }) {
      const newUtilities = {
        '.text-shadow-tight': {
          textShadow: '0 1px 2px rgba(0, 0, 0, 0.8), 0 1px 1px rgba(0, 0, 0, 0.8)',
        },
      };
      addUtilities(newUtilities);
    },
  ],
};