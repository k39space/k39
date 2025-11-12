import { db } from '@k39/database'

export default defineEventHandler(async (event) => {
  try {
    const id = getRouterParam(event, 'id')
    if (!id) {
      throw createError({
        statusCode: 400,
        statusMessage: 'Id is required',
      })
    }

    const pageReviewInDb = await db.pageReview.find(id)
    if (!pageReviewInDb) {
      throw createError({
        statusCode: 404,
        statusMessage: 'Review not found',
      })
    }

    return pageReviewInDb
  } catch (error) {
    throw errorResolver(error)
  }
})
