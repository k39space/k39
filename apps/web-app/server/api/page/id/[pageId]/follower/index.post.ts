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

    const user = await getUserFromSession(event)

    const follower = await db.page.findFollowerByUserId(pageId, user.id)
    if (follower?.userId) {
      throw createError({
        statusCode: 400,
        statusMessage: 'You are already following this page',
      })
    }

    await db.page.createFollower({ pageId, userId: user.id })
    await db.page.recountFollowers(pageId)

    return {
      ok: true,
    }
  } catch (error) {
    throw errorResolver(error)
  }
})
