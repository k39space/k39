import type { UserVK } from '#auth-utils'
import { findOrCreateUserByEmail } from '../../services/auth'

const logger = useLogger('vk')

export default defineOAuthVKEventHandler({
  config: {
    emailRequired: true,
  },
  async onSuccess(event, { user, tokens }) {
    logger.success('New auth', user, tokens)

    if (!user?.user?.user_id || !user.user?.email) {
      logger.error('OAuth error: missing email')
      return sendRedirect(event, '/sign-in')
    }

    const { user: vkUser } = user as unknown as UserVK
    const name = `${vkUser?.first_name} ${vkUser?.last_name}`

    const userInDB = await findOrCreateUserByEmail({
      email: vkUser.email,
      name,
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
