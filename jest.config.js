module.exports = {
  "roots": [
    "<rootDir>/src"
  ],
  "testResultsProcessor": "jest-junit",
  "testMatch": [
    "**/__tests__/**/*.+(ts|tsx|js)",
    "**/?(*.)+(spec|test).+(ts|tsx|js)"
  ],
  "transform": {
    "^.+\\.(ts|tsx)$": "ts-jest"
  },
}
