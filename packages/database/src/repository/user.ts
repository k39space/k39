import type { UserDraft } from '../types'
import { eq, sql } from 'drizzle-orm'
import { useDatabase } from '../database'
import { users } from '../tables'

export class User {
  static async find(id: string) {
    return useDatabase().query.users.findFirst({
      where: (users, { eq }) => eq(users.id, id),
    })
  }

  static async findByEmail(email: string) {
    return useDatabase().query.users.findFirst({
      where: (users, { eq }) => eq(users.email, email),
    })
  }

  static async create(data: UserDraft) {
    const [user] = await useDatabase().insert(users).values(data).returning()
    return user
  }

  static async update(id: string, data: Omit<Partial<UserDraft>, 'id' | 'createdAt'>) {
    const [user] = await useDatabase()
      .update(users)
      .set({
        ...data,
        updatedAt: sql`now()`,
      })
      .where(eq(users.id, id))
      .returning()
    return user
  }

  static async delete(id: string) {
    return useDatabase().delete(users).where(eq(users.id, id))
  }
}
