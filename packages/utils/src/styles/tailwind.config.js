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
      lineHeight: {
        inherit: 'inherit',
      },
      minWidth: {
        'max-content': 'max-content',
      },
      spacing: {
        '(screen-8)': 'calc(100vh - 2rem)',
        '(screen-12)': 'calc(100vh - 3rem)',
        '(screen-16)': 'calc(100vh - 4rem)',
        '(screen-20)': 'calc(100vh - 5rem)',
      },
    },
  },
  plugins: [require('@tailwindcss/ui'), require('tailwindcss-filters'), require('tailwindcss-truncate-multiline')()],
};
