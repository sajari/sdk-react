module.exports = {
  extends: ['plugin:@next/next/recommended', 'prettier'],
  env: {
    browser: true,
  },
  rules: {
    '@typescript-eslint/ban-ts-comment': 'off',
    '@typescript-eslint/no-explicit-any': 'off',
    'prefer-template': 'off',
    'simple-import-sort/imports': 'off',
    'simple-import-sort/exports': 'off',
    'react/default-props-match-prop-types': 'off',
  },
  settings: {
    react: {
      pragma: 'h',
      version: 'detect',
    },
  },
  parserOptions: {
    sourceType: 'module',
    ecmaFeatures: {
      jsx: true,
    },
    project: 'tsconfig.eslint.json',
    tsconfigRootDir: __dirname,
  },
};
