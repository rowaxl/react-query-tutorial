/**
 * Jest Configuration
 */
const { pathsToModuleNameMapper } = require("ts-jest/utils");
const { readFileSync } = require("fs");
const { parse } = require("jsonc-parser");
const { compilerOptions } = parse(readFileSync("./tsconfig.json").toString());
const moduleNameMapper = pathsToModuleNameMapper(compilerOptions.paths, { prefix: "<rootDir>/" });
const { setLogger } = require('react-query')

setLogger({
  log: console.log,
  warn: console.warn,
  error: () => {},
})


module.exports = {
  verbose: true,
  preset: 'ts-jest',
  testEnvironment: 'jsdom',
  moduleNameMapper,
  transformIgnorePatterns: ["/node_modules/", "\\.pnp\\.[^\\\/]+$"],
  globals: {
    'ts-jest': {
      tsconfig: 'tsconfig.jest.json'
    }
  }
}