import type { StartedPostgreSqlContainer } from '@testcontainers/postgresql'
import { PostgreSqlContainer } from '@testcontainers/postgresql'
import { afterAll, beforeAll } from 'vitest'
import { useCreateDatabase, useDatabase, useMigrateDatabase } from '../src/database'

let container: StartedPostgreSqlContainer | undefined

async function initDb() {
  if (container) {
    await container.stop()
  }

  container = await new PostgreSqlContainer('postgres:18').start()

  // Init DB
  useCreateDatabase(container.getConnectionUri())

  // Run migrations
  await useMigrateDatabase()
}

beforeAll(async () => {
  await initDb()
})

afterAll(async () => {
  if (container) {
    await useDatabase().$client.end()
    await container.stop()
  }
})
