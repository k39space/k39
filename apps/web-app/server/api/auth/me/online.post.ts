import { db } from '@k39/database'

export default defineEventHandler(async (event) => {
  try {
    const user = await db.user.find(event.context.user.id)
    if (!user?.id) {
      throw createError({
        statusCode: 404,
        message: 'User not found',
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
