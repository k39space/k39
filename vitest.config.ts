import { coverageConfigDefaults, defineConfig } from 'vitest/config'

export default defineConfig({
  test: {
    projects: [
      {
        test: {
          name: 'packages/database',
          root: './packages/database',
          environment: 'node',
          setupFiles: ['./test/setup.ts'],
        },
      },
    ],
    coverage: {
      exclude: [
        '**/{nitro,release,nuxt,app,drizzle}.config.*',
        '**/{vue-i18n}.options.*',
        ...coverageConfigDefaults.exclude,
      ],
      thresholds: {
        statements: 80,
        branches: 80,
        functions: 80,
        lines: 80,
      },
    },
    testTimeout: 10_000,
    hookTimeout: 10_000,
  },
})
