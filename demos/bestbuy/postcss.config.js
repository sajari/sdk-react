/* eslint-disable global-require, import/no-extraneous-dependencies */
const { tailwindConfig } = require('@sajari-ui/core');

// Setup purging of CSS
tailwindConfig.purge.content.push('./src/**/*.{js,html}');

module.exports = {
  plugins: [
    require('postcss-import'),
    require('tailwindcss')(tailwindConfig),
    require('autoprefixer'),
    require('postcss-clean')({
      level: 2, // Merge duplicated declarations
    }),
  ],
};
