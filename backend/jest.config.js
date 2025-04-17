/** @type {import('ts-jest').JestConfigWithTsJest} */
module.exports = {
  preset: 'ts-jest',
  testEnvironment: 'node',
  transform: {
    '^.+\\.tsx?$': ['ts-jest'],
  },
  setupFiles: ['<rootDir>/tests/env-setup.ts'],
  setupFilesAfterEnv: ['<rootDir>/tests/setup.ts'],
};
