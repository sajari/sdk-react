module.exports = {
  transform: {
    '^.+\\.(js|jsx|ts|tsx)$': '<rootDir>/jest/jest-preprocess.js',
    '^.+\\.svg$': 'jest-svg-transformer',
  },
  setupFilesAfterEnv: ['<rootDir>/jest/setupFilesAfterEnv.js'],
  snapshotSerializers: ['@emotion/jest/serializer'],
};
