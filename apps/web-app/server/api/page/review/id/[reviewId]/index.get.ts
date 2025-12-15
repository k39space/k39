import { db } from '@k39/database'

export default defineEventHandler(async (event) => {
  try {
    const reviewId = getRouterParam(event, 'reviewId')
    if (!reviewId) {
      throw createError({
        statusCode: 400,
        statusMessage: 'Id is required',
      })
    }

    const pageReviewInDb = await db.pageReview.find(reviewId)
    if (!pageReviewInDb) {
      throw createError({
        statusCode: 404,
        statusMessage: 'Review not found',
        data: {
          code: 'PAGE_REVIEW_NOT_FOUND',
          message: 'Отзыв не найден.',
        },
      })
    }

    return pageReviewInDb
  } catch (error) {
    throw errorResolver(error)
  }
})
