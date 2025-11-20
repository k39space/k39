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

    const categoryInDb = await db.category.findBySlug(slug)
    if (!categoryInDb) {
      throw createError({
        statusCode: 404,
        statusMessage: 'Category not found',
      })
    }

    return categoryInDb
  } catch (error) {
    throw errorResolver(error)
  }
})
