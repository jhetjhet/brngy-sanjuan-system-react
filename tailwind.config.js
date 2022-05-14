const colors = require('tailwindcss/colors');

module.exports = {
  content: [
    "./src/**/*.{js,jsx,ts,tsx}",
  ],
  theme: {
    colors: {
      'parsley': {
        '50': '#f2f7f4',
        '100': '#e6eee9',
        '200': '#bfd5c9',
        '300': '#99bca8',
        '400': '#4d8a67',
        '500': '#005826',
        '600': '#004f22',
        '700': '#00421d',
        '800': '#003517',
        '900': '#002b13'
      },
      'broom': {
        '50': '#fffef3',
        '100': '#fffee7',
        '200': '#fffcc4',
        '300': '#fffaa0',
        '400': '#fff659',
        '500': '#fff212',
        '600': '#e6da10',
        '700': '#bfb60e',
        '800': '#99910b',
        '900': '#7d7709'
      },
      ...colors,
    },
    extend: {},
  },
  plugins: [],
}
