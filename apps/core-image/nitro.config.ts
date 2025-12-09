export default defineNitroConfig({
  compatibilityDate: '2025-11-01',
  srcDir: 'server',
  routeRules: {
    '/**': {
      cors: true,
      headers: {
        'access-control-allow-origin': '*',
        'access-control-allow-methods': 'GET, POST, PATCH, DELETE, OPTIONS',
        'access-control-allow-headers': 'Content-Type, Authorization',
      },
    },
  },
  experimental: {
    tasks: true,
  },
  scheduledTasks: {
    '0/20 * * * * ?': ['photos:optimize'], // Every 20 seconds
  },
})
