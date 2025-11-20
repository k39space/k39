import type { UserWithData } from '@k39/database'
import type { H3Event } from 'h3'
import { db } from '@k39/database'

export async function getUserFromSession(event: H3Event): Promise<UserWithData> {
  const session = await getUserSession(event)
  if (!session?.user) {
    throw createError({
      statusCode: 401,
      statusMessage: 'Unauthorized',
      data: {
        code: 'UNAUTHORIZED',
        message: 'Вы не авторизованы.',
      },
    })
  }

  const user = await db.user.find(session.user.id)
  if (!user?.id) {
    throw createError({
      statusCode: 401,
      statusMessage: 'Unauthorized',
      data: {
        code: 'UNAUTHORIZED',
        message: 'Вы не авторизованы.',
      },
    })
  }

  return user
}
