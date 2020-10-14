const tailwindUI = require('@tailwindcss/ui');
const truncateMultiLine = require("tailwindcss-truncate-multiline")();

module.exports = {
  future: {
    // removeDeprecatedGapUtilities: true,
    // purgeLayersByDefault: true,
  },
  purge: [],
  theme: {
    truncate: {
      lines: {
        2: '2',
        3: '3',
        4: '4',
        5: '5',
      }
    },
    extend: {
      fontSize: {
        'code-inline': '0.9375em',
      }
    }
  },
  variants: {
    boxShadow: ['responsive', 'hover', 'focus', 'focus-within'],
    textColor: ['responsive', 'hover', 'focus', 'group-hover', 'group-focus'],
    backgroundColor: ['responsive', 'hover', 'focus', 'checked', 'group-hover', 'group-focus'],
    borderColor: ['responsive', 'hover', 'focus', 'checked'],
  },
  plugins: [tailwindUI, truncateMultiLine],
};
