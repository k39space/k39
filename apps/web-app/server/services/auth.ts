import type { User } from '@k39/database'
import { db } from '@k39/database'
import { createId } from '@paralleldrive/cuid2'

const logger = useLogger('user')

export async function findOrCreateUserByEmail(data: { email: string, name?: string | null }): Promise<User> {
  const userInDB = await db.user.findByEmail(data.email)
  if (userInDB) {
    return userInDB
  }

  const id = createId()
  const avatarHost = 'https://avatar.k39.online'

  const newUser = await db.user.create({
    id,
    username: id,
    name: data?.name ?? 'Аноним',
    email: data.email,
    avatarUrl: `${avatarHost}/${id}.svg`,
  })

  logger.success('New user created', newUser)

  return newUser
}
