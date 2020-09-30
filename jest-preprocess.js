const babelOptions = {
  presets: ["@babel/env", "@babel/preset-typescript"],
  plugins: ["babel-plugin-macros"]
};

module.exports = require("babel-jest").createTransformer(babelOptions);
