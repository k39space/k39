import { db } from '@k39/database'
import { createPageReviewVoteServerSchema } from '@k39/types/server'

export default defineEventHandler(async (event) => {
  try {
    const reviewId = getRouterParam(event, 'reviewId')
    if (!reviewId) {
      throw createError({
        statusCode: 400,
        statusMessage: 'Id is required',
      })
    }

    const user = await getUserFromSession(event)

    const body = await readBody(event)
    const data = createPageReviewVoteServerSchema.parse(body)

    const vote = await db.pageReview.findVoteByReviewIdAndUserId(reviewId, user.id)
    if (vote) {
      throw createError({
        statusCode: 400,
        statusMessage: 'Conflict',
        data: {
          code: 'PAGE_REVIEW_VOTE_ALREADY_EXISTS',
          message: 'Вы уже проголосовали.',
        },
      })
    }

    await db.pageReview.createVote({
      userId: user.id,
      pageReviewId: reviewId,
      type: data.type,
    })

    await db.pageReview.recountVotes(reviewId)

    return {
      ok: true,
    }
  } catch (error) {
    throw errorResolver(error)
  }
})
