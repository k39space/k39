import type { UserTwitch } from '#auth-utils'
import { findOrCreateUserByEmail } from '../../services/auth'

const logger = useLogger('twitch')

export default defineOAuthTwitchEventHandler({
  config: {
    emailRequired: true,
  },
  async onSuccess(event, { user, tokens }) {
    logger.success('New auth', user, tokens)

    if (!user?.id || !user?.login || !user?.email) {
      logger.error('OAuth error: missing name or email')
      return sendRedirect(event, '/sign-in')
    }

    const twitchUser = user as unknown as UserTwitch

    const userInDB = await findOrCreateUserByEmail({
      email: twitchUser.email,
      name: twitchUser?.login,
    })

    await setUserSession(event, {
      user: {
        id: userInDB.id,
        email: userInDB.email,
      },
    })

    const redirectTo = getCookie(event, 'redirectTo')
    return sendRedirect(event, redirectTo ?? '/')
  },
  onError(event, error) {
    logger.error('OAuth error:', error)
    return sendRedirect(event, '/sign-in')
  },
})
