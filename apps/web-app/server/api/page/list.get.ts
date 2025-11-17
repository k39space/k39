import { db } from '@k39/database'

export default defineEventHandler(async () => {
  try {
    return db.page.list()
  } catch (error) {
    throw errorResolver(error)
  }
})
