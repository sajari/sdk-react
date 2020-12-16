const babelOptions = {
  presets: ['@babel/env', '@babel/preset-react', '@emotion/babel-preset-css-prop', '@babel/preset-typescript'],
  plugins: ['babel-plugin-macros'],
};

module.exports = require('babel-jest').createTransformer(babelOptions);
