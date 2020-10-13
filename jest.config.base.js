module.exports = {
  transform: {
    '^.+\\.(js|jsx|ts|tsx)$': '<rootDir>/jest-preprocess.js',
  },
  setupFilesAfterEnv: ['@testing-library/jest-dom/extend-expect'],
};
