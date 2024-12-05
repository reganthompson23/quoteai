/** @type {import('tailwindcss').Config} */
export default {
  content: ['./index.html', './src/**/*.{js,ts,jsx,tsx}'],
  theme: {
    extend: {
      textShadow: {
        tight: '0 2px 4px rgba(0, 0, 0, 0.9), 1px 1px 3px rgba(0, 0, 0, 0.9)',
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