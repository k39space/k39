import type { PageReviewDraft, PageReviewPhoto, PageReviewPhotoDraft, PageReview as PageReviewType, PageReviewVote, PageReviewVoteDraft, PageReviewWithData } from '../types'
import { eq, sql } from 'drizzle-orm'
import { useDatabase } from '../database'
import { pageReviewPhotos, pageReviews, pageReviewVotes } from '../tables'

export class PageReview {
  static async find(id: string): Promise<PageReviewWithData | undefined> {
    return useDatabase().query.pageReviews.findFirst({
      where: (pageReviews, { eq }) => eq(pageReviews.id, id),
      with: {
        user: true,
        page: true,
        photos: {
          where: (pageReviewPhotos, { eq }) => eq(pageReviewPhotos.type, 'public'),
          with: {
            photo: {
              with: {
                versions: true,
              },
            },
          },
        },
      },
    })
  }

  static async findByPageIdAndUserId(pageId: string, userId: string): Promise<PageReviewWithData | undefined> {
    return useDatabase().query.pageReviews.findFirst({
      where: (pageReviews, { eq, and }) => and(
        eq(pageReviews.pageId, pageId),
        eq(pageReviews.userId, userId),
      ),
      with: {
        user: true,
        page: true,
        photos: {
          where: (pageReviewPhotos, { eq }) => eq(pageReviewPhotos.type, 'public'),
          with: {
            photo: {
              with: {
                versions: true,
              },
            },
          },
        },
      },
    })
  }

  static async findVoteByReviewIdAndUserId(reviewId: string, userId: string): Promise<PageReviewVote | undefined> {
    return useDatabase().query.pageReviewVotes.findFirst({
      where: (pageReviewVotes, { eq, and }) => and(
        eq(pageReviewVotes.pageReviewId, reviewId),
        eq(pageReviewVotes.userId, userId),
      ),
    })
  }

  static async listByPageId(pageId: string): Promise<PageReviewWithData[]> {
    return useDatabase().query.pageReviews.findMany({
      where: (pageReviews, { eq }) => eq(pageReviews.pageId, pageId),
      with: {
        user: true,
        page: true,
        photos: {
          where: (pageReviewPhotos, { eq }) => eq(pageReviewPhotos.type, 'public'),
          with: {
            photo: {
              with: {
                versions: true,
              },
            },
          },
        },
      },
      limit: 100,
    })
  }

  static async create(data: PageReviewDraft): Promise<PageReviewType> {
    const result = await useDatabase().insert(pageReviews).values(data).returning()

    if (result.length === 0) {
      throw new Error('Page review creation failed: no data returned from DB')
    }

    return result[0] as PageReviewType
  }

  static async createPhoto(data: PageReviewPhotoDraft): Promise<PageReviewPhoto> {
    const result = await useDatabase().insert(pageReviewPhotos).values(data).returning()

    if (result.length === 0) {
      throw new Error('Page review photo creation failed: no data returned from DB')
    }

    return result[0] as PageReviewPhoto
  }

  static async createVote(data: PageReviewVoteDraft): Promise<PageReviewVote> {
    const result = await useDatabase().insert(pageReviewVotes).values(data).returning()

    if (result.length === 0) {
      throw new Error('Page review vote creation failed: no data returned from DB')
    }

    return result[0] as PageReviewVote
  }

  static async recountVotes(reviewId: string) {
    const rows = await useDatabase().query.pageReviewVotes.findMany({
      columns: {
        type: true,
      },
      where: (pageReviewVotes, { eq }) => eq(pageReviewVotes.pageReviewId, reviewId),
    })

    const likesCount = rows.filter((row) => row.type === 'like').length
    const dislikesCount = rows.filter((row) => row.type === 'dislike').length
    const voteBalance = likesCount - dislikesCount

    await useDatabase()
      .update(pageReviews)
      .set({
        likesCount,
        dislikesCount,
        voteBalance,
      })
      .where(eq(pageReviews.id, reviewId))
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

  static async updateVote(id: string, data: Omit<Partial<PageReviewVoteDraft>, 'id' | 'createdAt'>) {
    const [vote] = await useDatabase()
      .update(pageReviewVotes)
      .set({
        ...data,
        updatedAt: sql`now()`,
      })
      .where(eq(pageReviewVotes.id, id))
      .returning()
    return vote
  }

  static async delete(id: string) {
    return useDatabase().delete(pageReviews).where(eq(pageReviews.id, id))
  }

  static async deleteVote(id: string) {
    return useDatabase().delete(pageReviewVotes).where(eq(pageReviewVotes.id, id))
  }
}
