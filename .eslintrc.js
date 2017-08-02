module.exports = {
  parser: "babel-eslint",
  env: {
    browser: true,
    es6: true
  },
  extends: ["eslint:recommended", "plugin:react/recommended"],
  parserOptions: {
    ecmaFeatures: {
      ecmaVersion: 8,
      experimentalObjectRestSpread: true,
      jsx: true
    },
    sourceType: "module"
  },
  overrides: {
    files: "src/*.js",
    excludedFiles: "**.*.test.js"
  },
  plugins: ["class-property", "react", "import"],
  rules: {
    "linebreak-style": ["error", "unix"],
    semi: ["error", "always"],
    "import/no-unresolved": [2, { commonjs: true, amd: true }],
    "import/named": 2,
    "import/namespace": 2,
    "import/default": 2,
    "import/export": 2,
    "react/no-unescaped-entities": 0
  }
};
