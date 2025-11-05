import type { UserGitHub } from '#auth-utils'
import { db } from '@k39/database'
import { createId } from '@paralleldrive/cuid2'

const logger = useLogger('github')

export default defineOAuthGitHubEventHandler({
  config: {
    emailRequired: true,
  },
  async onSuccess(event, { user, tokens }) {
    logger.success('New auth', user, tokens)

    if (!user?.id || !user?.email) {
      logger.error('GitHub OAuth error: Missing email')
      return sendRedirect(event, '/sign-in')
    }

    const githubUser = user as unknown as UserGitHub

    async function createUser() {
      const user = await db.user.create({
        email: githubUser.email,
        name: githubUser?.name ?? 'Аноним',
        username: createId(),
        avatarUrl: githubUser?.avatar_url,
      })

      logger.success('New user created', user)

      return user
    }

    const userInDB = await db.user.findByEmail(githubUser.email) ?? await createUser()
    if (!userInDB) {
      logger.error('GitHub OAuth error: User not found')
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
    logger.error('GitHub OAuth error:', error)
    return sendRedirect(event, '/sign-in')
  },
})
