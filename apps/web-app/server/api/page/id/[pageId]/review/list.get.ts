import { db } from '@k39/database'

export default defineEventHandler(async (event) => {
  try {
    const pageId = getRouterParam(event, 'pageId')
    if (!pageId) {
      throw createError({
        statusCode: 400,
        statusMessage: 'Id is required',
      })
    }

    return db.pageReview.listByPageId(pageId)
  } catch (error) {
    throw errorResolver(error)
  }
})
