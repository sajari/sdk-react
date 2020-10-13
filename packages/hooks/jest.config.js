// Jest configuration for api
const base = require('../../jest.config.base.js');

module.exports = {
  ...base,
  rootDir: '../..',
  testMatch: ['<rootDir>/packages/hooks/**/*.test.ts', '<rootDir>/packages/hooks/**/*.test.tsx'],
  name: '@sajari/react-hooks',
  displayName: 'hooks',
};
