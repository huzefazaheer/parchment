module.exports = {
  testEnvironment: 'node',
  setupFilesAfterEnv: ['<rootDir>/src/tests/setup.js'],
  verbose: true,
  forceExit: true,
  detectOpenHandles: true,
  maxWorkers: 1,
}
