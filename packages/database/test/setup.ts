import type { StartedPostgreSqlContainer } from '@testcontainers/postgresql'
import { resolve } from 'node:path'
import process from 'node:process'
import { PostgreSqlContainer } from '@testcontainers/postgresql'
import { useCreateDatabase, useMigrateDatabase } from '../src/database'

let container: StartedPostgreSqlContainer | undefined

async function initDb() {
  if (container) {
    await container.stop()
  }

  container = await new PostgreSqlContainer('postgres:18')
    .withDatabase('testdb')
    .withUsername('test')
    .withPassword('test')
    .start()

  // Init DB
  useCreateDatabase(container.getConnectionUri())

  // Run migrations
  const migrationFolder = resolve(process.cwd(), 'packages/database/migrations')
  await useMigrateDatabase(migrationFolder)
}

export async function cleanup() {
  if (container) {
    await container.stop()
  }
}

// eslint-disable-next-line antfu/no-top-level-await
await initDb()
