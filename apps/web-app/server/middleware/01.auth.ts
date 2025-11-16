import type { User } from '@k39/database'
import type { H3Event } from 'h3'
import { db } from '@k39/database'

const logger = useLogger('middleware:auth')

const routesWithoutAuth = [
  '/api/health',
  '/api/auth/provider',
  '/api/auth/github',
  '/api/auth/twitch',
  '/api/auth/vk',
  '/api/auth/yandex',
  '/api/user/username',
  '/api/badge/list',
  '/api/page/slug',
  '/api/page/review/id',
  '/api/advent/days',
]

/**
 * Cover all requests (except the ones without auth)
 */
export default defineEventHandler(async (event) => {
  // Skip if preflight
  if (event.method === 'OPTIONS') {
    return
  }

  // Skip routes without auth
  if (!event.path.startsWith('/api') || routesWithoutAuth.some((route) => event.path.startsWith(route))) {
    return
  }

  const user = await getUserFromSession(event)

  // No auth?
  if (!user) {
    throw createError({
      statusCode: 401,
      message: 'Unauthorized',
    })
  }

  event.context.user = user
})

async function getUserFromSession(event: H3Event): Promise<User | null> {
  try {
    const session = await getUserSession(event)
    if (!session?.user) {
      return null
    }

    const user = await db.user.find(session.user.id)
    if (!user?.id) {
      return null
    }

    return user
  } catch (e) {
    logger.error(e)
  }

  return null
}
