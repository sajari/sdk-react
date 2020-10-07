module.exports = {
  transform: {
    "^.+\\.[jt]sx?$": "<rootDir>/jest-preprocess.js"
  },
  setupFilesAfterEnv: ["@testing-library/jest-dom/extend-expect"]
};
