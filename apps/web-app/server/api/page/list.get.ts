import { db } from '@k39/database'

export default defineEventHandler(async () => {
  try {
    const pages = await db.page.list()
    if (!pages.length) {
      throw createError({
        statusCode: 404,
        statusMessage: 'Pages not found',
      })
    }

    return pages
  } catch (error) {
    throw errorResolver(error)
  }
})
