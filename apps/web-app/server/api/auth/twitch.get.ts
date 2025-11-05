import type { UserTwitch } from '#auth-utils'
import { db } from '@k39/database'
import { createId } from '@paralleldrive/cuid2'

const logger = useLogger('twitch')

export default defineOAuthTwitchEventHandler({
  config: {
    emailRequired: true,
  },
  async onSuccess(event, { user, tokens }) {
    logger.success('New auth', user, tokens)

    if (!user?.id || !user?.login || !user?.email) {
      logger.error('Twitch OAuth error: missing name or email')
      return sendRedirect(event, '/sign-in')
    }

    const twitchUser = user as unknown as UserTwitch

    async function createUser() {
      const user = await db.user.create({
        email: twitchUser.email,
        name: twitchUser?.login,
        username: createId(),
        avatarUrl: twitchUser?.profile_image_url,
      })

      logger.success('New user created', user)

      return user
    }

    const userInDB = await db.user.findByEmail(twitchUser.email) ?? await createUser()
    if (!userInDB) {
      logger.error('Twitch OAuth error: User not found')
      return sendRedirect(event, '/sign-in')
    }

    await setUserSession(event, {
      user: {
        id: userInDB.id,
        name: userInDB.name,
        email: userInDB.email,
        avatarUrl: userInDB.avatarUrl,
      },
    })
    return sendRedirect(event, '/')
  },
  onError(event, error) {
    logger.error('Twitch OAuth error:', error)
    return sendRedirect(event, '/sign-in')
  },
})
