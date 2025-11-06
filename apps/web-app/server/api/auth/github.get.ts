import type { UserGitHub } from '#auth-utils'
import { findOrCreateUserByEmail } from '../../services/auth'

const logger = useLogger('github')

export default defineOAuthGitHubEventHandler({
  config: {
    emailRequired: true,
  },
  async onSuccess(event, { user, tokens }) {
    logger.success('New auth', user, tokens)

    if (!user?.id || !user?.email) {
      logger.error('OAuth error: Missing email')
      return sendRedirect(event, '/sign-in')
    }

    const githubUser = user as unknown as UserGitHub

    const userInDB = await findOrCreateUserByEmail({
      email: githubUser.email,
      name: githubUser?.name,
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
