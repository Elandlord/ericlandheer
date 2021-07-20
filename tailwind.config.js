module.exports = {
  purge: [
    './resources/**/*.blade.php',
    './resources/**/*.js',
    './resources/**/*.vue',
  ],
  darkMode: false, // or 'media' or 'class'
  theme: {
    extend: {
        screens: {
            sm: '640px',
            md: '768px',
            lg: '1024px',
            xl: '1280px',
            '2xl': '1536px'
        },

        colors: {

        },

        fontFamily: {
            sans: ['Graphik', 'sans-serif'],
            serif: ['Merriweather', 'serif'],
        },

        spacing: {
            px: '1px',
            '0': '0',
            '1': '0.25rem',
            '2': '0.5rem',
            '3': '0.75rem',
            '4': '1rem',
            '5': '1.25rem',
            '6': '1.5rem',
            '8': '2rem',
            '10': '2.5rem',
            '12': '3rem',
            '14': '3.5rem',
            '16': '4rem',
            '18': '4.5rem',
            '20': '5rem',
            '22': '5.5rem',
            '24': '6rem',
            '28': '7rem',
            '32': '8rem',
            '40': '10rem',
            '48': '12rem',
            '56': '14rem',
            '64': '16rem',
            '84': '21rem',
            '100': '25rem',
            '110': '27.5rem',
            '130': '32.5rem',
            '160': '40rem',
            '190': '47.5rem',
            '210': '52.5rem',
            '230': '57.5rem',
        },
    },
  },
  variants: {
    extend: {},
  },
  plugins: [],
}
