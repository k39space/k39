import type { UserYandex } from '#auth-utils'
import { findOrCreateUserByEmail } from '../../services/auth'

const logger = useLogger('yandex')

export default defineOAuthYandexEventHandler({
  async onSuccess(event, { user, tokens }) {
    logger.success('New auth', user, tokens)

    if (!user?.id || !user.default_email) {
      logger.error('OAuth error: missing email')
      return sendRedirect(event, '/sign-in')
    }

    const yandexUser = user as unknown as UserYandex

    const userInDB = await findOrCreateUserByEmail({
      email: yandexUser.default_email,
      name: yandexUser?.display_name,
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
