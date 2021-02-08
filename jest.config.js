module.exports = {
  preset: 'react-native',
  roots: ['<rootDir>/src'],
  collectCoverageFrom: [
    '<rootDir>/src/**/*.{ts,tsx}',
    '!<rootDir>/src/**/index.{ts,tsx}',
    '!<rootDir>/src/**/*.stories.tsx',
    '!<rootDir>/src/**/protocols/**/*',
    '!<rootDir>/src/**/tests/**/*',
    '!**/*.d.ts'
  ],
  coverageDirectory: 'coverage',
  testPathIgnorePatterns: ['<rootDir>/node_modules/'],
  testEnvironment: 'jsdom',
  transformIgnorePatterns: ['node_modules/(?!react-native|react-navigation)/'],
  moduleNameMapper: {
    '@/(.*)': '<rootDir>/src/$1'
  }
}
