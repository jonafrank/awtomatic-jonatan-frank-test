/** @type {import('ts-jest/dist/types').InitialOptionsTsJest} */
module.exports = {
  preset: 'ts-jest',
  testEnvironment: 'node',
  rootDir: './src',
  collectCoverage: true,
  collectCoverageFrom: ['src/**'],
  detectOpenHandles: true,
};
