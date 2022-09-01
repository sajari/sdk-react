import colors from 'tailwindcss/colors';

export default {
  theme: {
    backdropFilter: {
      none: 'none',
      'blur-1': 'blur(0.25rem)',
      'blur-2': 'blur(0.5rem)',
      'blur-3': 'blur(0.75rem)',
      'blur-4': 'blur(1rem)',
      'blur-5': 'blur(1.25rem)',
      'blur-6': 'blur(1.5rem)',
    },
    colors: {
      current: 'currentColor',
      transparent: 'transparent',

      white: colors.white,
      black: colors.black,

      gray: colors.coolGray,
      red: colors.red,
      orange: colors.orange,
      yellow: colors.amber,
      green: colors.emerald,
      teal: colors.teal,
      blue: colors.blue,
      indigo: colors.indigo,
      purple: colors.violet,
      pink: colors.pink,
      'cool-gray': colors.coolGray,
    },
    fontSize: {
      xs: '0.75rem',
      sm: '0.875rem',
      base: '1rem',
      lg: '1.125rem',
      xl: '1.25rem',
      '2xl': '1.5rem',
      '3xl': '1.875rem',
      '4xl': '2.25rem',
      '5xl': '3rem',
      '6xl': '4rem',
    },
    truncate: {
      lines: {
        2: '2',
        3: '3',
        4: '4',
        5: '5',
      },
    },
    extend: {
      backgroundOpacity: {
        95: 0.95,
      },
      borderRadius: {
        inherit: 'inherit',
      },
      boxShadow: {
        menu: 'inset 0 0 0 1px rgba(0, 0, 0, 0.1), 0 1px 5px rgba(0, 0, 0, 0.1), inset 0 -1px 0 rgba(0, 0, 0, 0.1)',
      },
      fontSize: {
        'code-inline': '0.9375em',
      },
      fontFamily: {
        inherit: 'inherit',
      },
      zIndex: {
        max: 2147483647,
      },
      lineHeight: {
        inherit: 'inherit',
      },
      maxWidth: {
        'fit-content': 'fit-content',
        '7xl': '80rem',
        'screen-2xl': '1536px',
      },
      minWidth: {
        'max-content': 'max-content',
      },
      padding: {
        '1/2': '50%',
        '1/3': '33.333333%',
        '2/3': '66.666667%',
        '1/4': '25%',
        '2/4': '50%',
        '3/4': '75%',
        '1/5': '20%',
        '2/5': '40%',
        '3/5': '60%',
        '4/5': '80%',
        '1/6': '16.666667%',
        '2/6': '33.333333%',
        '3/6': '50%',
        '4/6': '66.666667%',
        '5/6': '83.333333%',
        '1/12': '8.333333%',
        '2/12': '16.666667%',
        '3/12': '25%',
        '4/12': '33.333333%',
        '5/12': '41.666667%',
        '6/12': '50%',
        '7/12': '58.333333%',
        '8/12': '66.666667%',
        '9/12': '75%',
        '10/12': '83.333333%',
        '11/12': '91.666667%',
        full: '100%',
      },
      spacing: {
        13: '3.25rem',
        15: '3.75rem',
        '(screen-8)': 'calc(100vh - 2rem)',
        '(screen-12)': 'calc(100vh - 3rem)',
        '(screen-16)': 'calc(100vh - 4rem)',
        '(screen-20)': 'calc(100vh - 5rem)',
      },
    },
  },
  plugins: [
    require('@tailwindcss/forms'),
    require('@tailwindcss/typography'),
    require('tailwindcss-filters'),
    require('tailwindcss-truncate-multiline')(),
  ],
};
