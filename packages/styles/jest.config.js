// Jest configuration for api
const base = require('../../jest.config.base.js');

module.exports = {
  ...base,
  rootDir: '../..',
  testMatch: ['<rootDir>/packages/styles/**/*.test.ts', '<rootDir>/packages/styles/**/*.test.tsx'],
  name: 'sajari-react-sdk-styles',
  displayName: 'styles',
};
