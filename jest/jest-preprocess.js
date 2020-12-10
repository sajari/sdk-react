/* eslint-disable import/no-extraneous-dependencies */
const babelOptions = {
  presets: ['@babel/env', '@babel/preset-react', '@babel/preset-typescript'],
  plugins: ['babel-plugin-macros'],
};

module.exports = require('babel-jest').createTransformer(babelOptions);
