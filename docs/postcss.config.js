/* eslint-disable global-require, import/no-extraneous-dependencies */
const { tailwindConfig } = require('@sajari-ui/core');

// tailwindConfig.purge.enabled = true;
tailwindConfig.purge.content.push(
  './components/**/*.tsx',
  './pages/**/*.tsx',
  './pages/**/*.mdx',
  '../node_modules/@sajari-ui/core/dist/*.js',
);

module.exports = {
  plugins: [
    'postcss-import',
    ['tailwindcss', tailwindConfig],
    'autoprefixer',
    [
      'postcss-clean',
      {
        level: 2, // Merge duplicated declarations
      },
    ],
  ],
};
