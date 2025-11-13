import type { Buffer } from 'node:buffer'
import { db } from '@k39/database'
import { createPageReviewServerSchema } from '@k39/types/server'

export default defineEventHandler(async (event) => {
  try {
    const pageId = getRouterParam(event, 'pageId')
    if (!pageId) {
      throw createError({
        statusCode: 400,
        statusMessage: 'Id is required',
      })
    }

    const pageInDb = await db.page.find(pageId)
    if (!pageInDb) {
      throw createError({
        statusCode: 404,
        statusMessage: 'Page not found',
      })
    }

    const userId = event.context.user.id
    const formData = await readMultipartFormData(event)
    if (!formData) {
      throw createError({
        statusCode: 400,
        statusMessage: 'Form data is required',
      })
    }

    const fields: Record<string, string> = {}
    const files: { data: Buffer, name?: string, filename?: string, type?: string }[] = []

    for (const item of formData) {
      if (!item.name) {
        continue
      }
      if (item.name === 'photos') {
        files.push(item)
        continue
      }

      fields[item.name] = item.data.toString()
    }

    const parsedFields = {
      ...fields,
      rating: Number(fields.rating),
    }

    const data = createPageReviewServerSchema.parse(parsedFields)

    // Guard: Check if user already reviewed this page
    const pageReviewInDb = await db.pageReview.findByPageIdAndUserId(pageId, userId)
    if (pageReviewInDb) {
      throw createError({
        statusCode: 409,
        statusMessage: 'Conflict',
        data: {
          code: 'PAGE_REVIEW_ALREADY_EXISTS',
          message: 'У вас уже есть отзыв.',
        },
      })
    }

    const review = await db.pageReview.create({
      pageId,
      userId,
      rating: data.rating,
      pros: data.pros,
      cons: data.cons,
      comment: data.comment,
    })

    return {
      ok: true,
      result: review,
    }
  } catch (error) {
    throw errorResolver(error)
  }
})
