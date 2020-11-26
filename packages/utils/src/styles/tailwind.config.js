export default {
  future: {
    // removeDeprecatedGapUtilities: true,
    // purgeLayersByDefault: true,
  },
  purge: [],
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
    truncate: {
      lines: {
        2: '2',
        3: '3',
        4: '4',
        5: '5',
      },
    },
    extend: {
      borderRadius: {
        inherit: 'inherit',
      },
      fontSize: {
        'code-inline': '0.9375em',
      },
      fontFamily: {
        inherit: 'inherit',
      },
      lineHeight: {
        inherit: 'inherit',
      },
    },
  },
  plugins: [require('@tailwindcss/ui'), require('tailwindcss-filters'), require('tailwindcss-truncate-multiline')()],
};
