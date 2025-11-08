import type { PageReviewDraft, PageReview as PageReviewType, PageReviewWithData } from '../types'
import { eq, sql } from 'drizzle-orm'
import { useDatabase } from '../database'
import { pageReviews } from '../tables'

export class PageReview {
  static async find(id: string): Promise<PageReviewWithData | undefined> {
    return useDatabase().query.pageReviews.findFirst({
      where: (pageReviews, { eq }) => eq(pageReviews.id, id),
      with: {
        user: true,
        page: true,
      },
    })
  }

  static async create(data: PageReviewDraft): Promise<PageReviewType> {
    const result = await useDatabase().insert(pageReviews).values(data).returning()

    if (result.length === 0) {
      throw new Error('Page review creation failed: no data returned from DB')
    }

    return result[0] as PageReviewType
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
