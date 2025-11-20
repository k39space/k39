import { db } from '@k39/database'

export default defineEventHandler(async (event) => {
  try {
    const user = await getUserFromSession(event)
    if (!user?.id) {
      throw createError({
        statusCode: 404,
        statusMessage: 'User not found',
      })
    }

    await db.user.updateOnline(user.id)

    return {
      ok: true,
    }
  } catch (error) {
    throw errorResolver(error)
  }
})
