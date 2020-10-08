// Jest configuration for api
const base = require('../../jest.config.base.js');

module.exports = {
  ...base,
  rootDir: '../..',
  testMatch: ['<rootDir>/packages/sdk/**/*.test.ts', '<rootDir>/packages/sdk/**/*.test.tsx'],
  name: '@sajari/react-sdk',
  displayName: 'sdk',
};
