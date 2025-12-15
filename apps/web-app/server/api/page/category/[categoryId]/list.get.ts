import { db } from '@k39/database'

export default defineEventHandler(async (event) => {
  try {
    const categoryId = getRouterParam(event, 'categoryId')
    if (!categoryId) {
      throw createError({
        statusCode: 400,
        statusMessage: 'Id is required',
      })
    }

    return db.page.listByCategory(categoryId)
  } catch (error) {
    throw errorResolver(error)
  }
})
