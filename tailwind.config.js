/** @type {import('tailwindcss').Config} */
module.exports = {
  mode: 'jit',
  content: ['./src/**/**/*.{js,ts,jsx,tsx,html,mdx}', './src/**/*.{js,ts,jsx,tsx,html,mdx}'],
  darkMode: 'class',
  theme: {
    screens: { md: { max: '1080px' }, sm: { max: '620px' } },
    extend: {
      colors: {
        white: {
          A700_7f: '#ffffff7f',
          A700_66: '#ffffff66',
          A700_19: '#ffffff19',
          A700: '#ffffff'
        },
        black: {
          900: '#090909',
          '900_b2': '#000000b2',
          '900_01': '#000000',
          '900_99': '#00000099'
        },
        gray: { 900: '#18150a', '900_b2': '#021719b2' },
        lime: { 900: '#a35c07', '900_01': '#9d561e' },
        deep_purple: {
          900: '#250685',
          A200_19: '#794eff19',
          A200_a3: '#794effa3',
          A100_cc: '#a588ffcc',
          A400: '#4616ff',
          A100: '#a681ff',
          A200: '#794eff',
          A200_00: '#794eff00',
          '900_01': '#200085',
          A200_d3: '#794effd3',
          A200_7f: '#794eff7f',
          A200_96: '#794eff96',
          A200_33: '#794eff33',
          A200_cc: '#794effcc'
        },
        yellow: {
          900: '#f7931a',
          '900_66': '#f7931a66',
          '900_33': '#f7931a33',
          '900_00': '#f7931a00',
          '900_19': '#f7931a19'
        },
        orange: { 50: '#fff0e0' },
        blue: { 200: '#a1d5ff' }
      },
      fontFamily: { syne: 'Syne', plusjakartasans: 'Plus Jakarta Sans' },
      backgroundImage: {
        gradient: 'linear-gradient(180deg ,#000000b2,#021719b2)',
        gradient1: 'linear-gradient(270deg ,#f7931a,#f7931a00)',
        gradient2: 'linear-gradient(180deg ,#f7931a,#a35c07)',
        gradient3: 'linear-gradient(122deg ,#9d561e,#ffffff)',
        gradient22: 'linear-gradient(270deg ,#794eff,#794eff00)',
        gradient4: 'linear-gradient(122deg ,#f7931a,#ffffff)',
        gradient33: 'linear-gradient(180deg ,#794eff,#250685)',
        gradient5: 'linear-gradient(180deg ,#000000b2,#0c0219b2)',
        gradient6: 'linear-gradient(122deg ,#794eff,#ffffff)',
        gradient7: 'linear-gradient(180deg ,#000000b2,#120219b2)',
        gradient8: 'linear-gradient(180deg ,#794eff,#200085)',
        gradient9: 'linear-gradient(180deg, #EA4C46, #F1959B)'
      }
    }
  },
  plugins: [require('@tailwindcss/forms')]
};
