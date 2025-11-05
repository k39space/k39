import type { UserYandex } from '#auth-utils'
import { db } from '@k39/database'
import { createId } from '@paralleldrive/cuid2'

const logger = useLogger('yandex')

export default defineOAuthYandexEventHandler({
  async onSuccess(event, { user, tokens }) {
    logger.success('New auth', user, tokens)

    if (!user?.id || !user.default_email) {
      logger.error('Yandex OAuth error: missing email')
      return sendRedirect(event, '/sign-in')
    }

    const yandexUser = user as unknown as UserYandex
    const avatarUrl = `https://avatars.yandex.net/get-yapic/${yandexUser?.default_avatar_id}/islands-retina-middle`

    async function createUser() {
      const user = await db.user.create({
        email: yandexUser.default_email,
        name: yandexUser?.display_name,
        username: createId(),
        avatarUrl,
      })

      logger.success('New user created', user)

      return user
    }

    const userInDB = await db.user.findByEmail(yandexUser.default_email) ?? await createUser()
    if (!userInDB) {
      logger.error('Yandex OAuth error: User not found')
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
    logger.error('Yandex OAuth error:', error)
    return sendRedirect(event, '/sign-in')
  },
})
