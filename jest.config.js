const {pathsToModuleNameMapper} = require('ts-jest/utils');
const {compilerOptions} = require('./tsconfig.json')

module.exports = {
  clearMocks: true,
  coverageProvider: "v8",
  preset: 'ts-jest',
  testEnvironment: "node",
  testMatch: ["**/*.spec.ts"],
  moduleNameMapper: pathsToModuleNameMapper(compilerOptions.paths, {prefix: '<rootDir>/src/'}),
  globals: {
    'ts-jest': {
      isolatedModules: true
    }
  },
  testEnvironment: 'node',
  transformIgnorePatterns: [
    "/node_modules/"
  ],
};
