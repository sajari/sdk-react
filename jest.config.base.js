module.exports = {
  transform: {
    '^.+\\.(js|jsx|ts|tsx)$': '<rootDir>/jest-preprocess.js',
    '^.+\\.svg$': 'jest-svg-transformer',
  },
  setupFilesAfterEnv: ['@testing-library/jest-dom/extend-expect'],
};
