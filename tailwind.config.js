const colors = require('tailwindcss/colors');

module.exports = {
  // content: ["./app/**/*.{js,ts,jsx,tsx}"],
  // theme: {
  //   extend: {},
  // },
  safelist: [
    'bg-white',
    'h-14',
    'h-36',
    'h-64', //?
    'h-72',
    'text-gray-300',
    'text-red-300',
    'text-gray-300',
    {
      pattern: /(bg|text)-(red|green|blue|gray)-(100|200|800|900)/,
      pattern: /grid-cols-(1|2|3|4)/,
    },
  ],

  plugins: [require('@tailwindcss/forms')],
  mode: 'jit',
  content: ['./app/**/*.{ts,tsx}'],
  important: '#app',

  theme: {
    extend: {
      colors: {
        primary: colors.sky,
        secondary: colors.emerald,
      },
      animation: {
        dropIn: 'dropIn 0.2s ease-out',
      },
      keyframes: {
        dropIn: {
          '0%': { transform: 'translateY(-100px)' },
          '100%': { transform: 'translateY(0)' },
        },
      },
    },
  },
};
