import { db } from '@k39/database'

export default defineEventHandler(async (event) => {
  try {
    const slug = getRouterParam(event, 'slug')
    if (!slug) {
      throw createError({
        statusCode: 400,
        statusMessage: 'Slug is required',
      })
    }

    const pageInDb = await db.page.findBySlug(slug)
    if (!pageInDb) {
      throw createError({
        statusCode: 404,
        statusMessage: 'Page not found',
      })
    }

    return pageInDb
  } catch (error) {
    throw errorResolver(error)
  }
})
