import type { StartedPostgreSqlContainer } from '@testcontainers/postgresql'
import { resolve } from 'node:path'
import { PostgreSqlContainer } from '@testcontainers/postgresql'
import { afterAll, beforeAll } from 'vitest'
import { useCloseDatabase, useCreateDatabase, useMigrateDatabase } from '../src/database'

let container: StartedPostgreSqlContainer | undefined

async function initDb() {
  if (container) {
    await container.stop()
  }

  container = await new PostgreSqlContainer('postgres:18').start()

  // Init DB
  useCreateDatabase(container.getConnectionUri())

  // Run migrations
  const migrationFolder = resolve(__dirname, '../migrations')
  await useMigrateDatabase(migrationFolder)
}

beforeAll(async () => {
  await initDb()
})

afterAll(async () => {
  if (container) {
    await useCloseDatabase()
    await container.stop()
  }
})
