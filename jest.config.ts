import nextJest from 'next/jest'
import {Config} from 'jest'

const createJestConfig = nextJest({
  dir: './',
})

const config: Config = {
  testEnvironment: 'jest-environment-jsdom',
  moduleNameMapper: {
    '^@/(.*)$': ['<rootDir>/$1'],
  },
}

// createJestConfig is exported this way to ensure that
// next/jest can load the Next.js config which is async
export default createJestConfig(config)