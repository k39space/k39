import { db } from '@k39/database'

export default defineEventHandler(async (event) => {
  try {
    const username = getRouterParam(event, 'username')
    if (!username) {
      throw createError({
        statusCode: 400,
        statusMessage: 'Username is required',
      })
    }

    const userInDB = await db.user.findByUsername(username)
    if (!userInDB) {
      throw createError({
        statusCode: 404,
        statusMessage: 'User not found',
      })
    }

    return {
      ...userInDB,
      followers: {
        count: 12,
        top: [
          {
            src: 'https://avatar.k39.online/1245343.svg',
          },
          {
            src: 'https://avatar.k39.online/1245354543.svg',
          },
          {
            src: 'https://avatar.k39.online/12452235343.svg',
          },
        ],
      },
      following: {
        count: 5,
        top: [
          {
            src: 'https://avatar.k39.online/124536543.svg',
          },
          {
            src: 'https://avatar.k39.online/124522354543.svg',
          },
          {
            src: 'https://avatar.k39.online/1245642235343.svg',
          },
        ],
      },
    }
  } catch (error) {
    throw errorResolver(error)
  }
})
