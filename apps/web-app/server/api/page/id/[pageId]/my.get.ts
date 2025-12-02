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

    const meAsFollower = await db.page.findFollowerByUserId(pageId, user.id)

    return meAsFollower ?? null
  } catch (error) {
    throw errorResolver(error)
  }
})
