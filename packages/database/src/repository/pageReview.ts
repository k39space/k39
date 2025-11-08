import type { PageReviewDraft } from '../types'
import { eq, sql } from 'drizzle-orm'
import { useDatabase } from '../database'
import { pageReviews } from '../tables'

export class PageReview {
  static async find(id: string) {
    return useDatabase().query.pageReviews.findFirst({
      where: (pageReviews, { eq }) => eq(pageReviews.id, id),
    })
  }

  static async create(data: PageReviewDraft) {
    const [review] = await useDatabase().insert(pageReviews).values(data).returning()
    return review
  }

  static async update(id: string, data: Omit<Partial<PageReviewDraft>, 'id' | 'createdAt'>) {
    const [review] = await useDatabase()
      .update(pageReviews)
      .set({
        ...data,
        updatedAt: sql`now()`,
      })
      .where(eq(pageReviews.id, id))
      .returning()
    return review
  }

  static async delete(id: string) {
    return useDatabase().delete(pageReviews).where(eq(pageReviews.id, id))
  }
}
