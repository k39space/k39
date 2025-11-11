import process from 'node:process'
import { useCreateDatabase } from '@k39/database'

/**
 * DB init
 */
export default defineNitroPlugin(async () => {
  if (!process.env.DATABASE_URL) {
    throw new Error('DATABASE_URL is not defined')
  }

  useCreateDatabase(process.env.DATABASE_URL)

  // In dev mode we don't execute migrations, for this we use the command `pnpm db:migrate` in `@k39/database`
  if (import.meta.dev) {
    return
  }

  await runTask('db:migrate')
})
