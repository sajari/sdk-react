const paths = [
  'packages/components/src/**/**/*.ts',
  'packages/components/src/**/**/*.tsx',
  'packages/hooks/src/**/**/*.ts',
  'packages/hooks/src/**/**/*.tsx',
  'packages/sdk/src/**/**/*.ts',
  'packages/sdk/src/**/**/*.tsx',
];

module.exports = {
  extends: ['airbnb-typescript'],
  overrides: [
    {
      files: paths,
      rules: {
        'import/no-extraneous-dependencies': 'off',
        'import/prefer-default-export': 'off',
        'implicit-arrow-linebreak': 'off',
        'function-paren-newline': 'off',
        'max-len': 'off',
        'react/prop-types': 'off',
        'react/jsx-props-no-spreading': 'off',
        // prettier takes care
        'object-curly-newline': 'off',
        'arrow-parens': 'off',
      },
    },
  ],
  env: {
    jest: true,
  },
  parserOptions: {
    project: './tsconfig.json',
  },
};
