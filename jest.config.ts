export default {
    moduleFileExtensions: ['js', 'json', 'ts'],
    testRegex: '.*\\.test\\.ts$',
    transform: {
      '^.+\\.(t|j)s$': 'ts-jest',
    },
    moduleDirectories: ['node_modules', '<rootDir>'],
    coverageReporters: ['text', 'cobertura'],
    collectCoverageFrom: [
      '**/config/**/*.(t|j)s',
      '**/src/**/*.(t|j)s',
      '!**/dist/**',
      '!**/node_modules/**',
    ],
    testEnvironment: 'node',
  };