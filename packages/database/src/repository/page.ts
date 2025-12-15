import type { PageDraft, PageFollower, PageFollowerDraft, PageFollowerWithData, Page as PageType, PageWithData } from '../types'
import { count, eq, sql } from 'drizzle-orm'
import { useDatabase } from '../database'
import { pageFollowers, pages } from '../tables'

export class Page {
  static async find(id: string): Promise<PageWithData | undefined> {
    return useDatabase().query.pages.findFirst({
      where: (pages, { eq }) => eq(pages.id, id),
      with: {
        categories: {
          with: {
            category: true,
          },
        },
        followers: {
          with: {
            user: true,
          },
        },
        pins: {
          orderBy: (pagePins, { desc }) => desc(pagePins.createdAt),
          with: {
            user: true,
          },
        },
        points: {
          with: {
            location: true,
          },
        },
      },
    })
  }

  static async findBySlug(slug: string): Promise<PageWithData | undefined> {
    return useDatabase().query.pages.findFirst({
      where: (pages, { eq }) => eq(pages.slug, slug),
      with: {
        categories: {
          with: {
            category: true,
          },
        },
        followers: {
          with: {
            user: true,
          },
        },
        pins: {
          orderBy: (pagePins, { desc }) => desc(pagePins.createdAt),
          with: {
            user: true,
          },
        },
        points: {
          with: {
            location: true,
          },
        },
      },
    })
  }

  static async findFollowerByUserId(pageId: string, userId: string): Promise<PageFollowerWithData | undefined> {
    return useDatabase().query.pageFollowers.findFirst({
      where: (pageFollowers, { eq, and }) => and(
        eq(pageFollowers.pageId, pageId),
        eq(pageFollowers.userId, userId),
      ),
      with: {
        user: true,
      },
    })
  }

  static async list(): Promise<PageWithData[]> {
    return useDatabase().query.pages.findMany({
      with: {
        categories: {
          with: {
            category: true,
          },
        },
        followers: {
          with: {
            user: true,
          },
        },
        pins: {
          orderBy: (pagePins, { desc }) => desc(pagePins.createdAt),
          with: {
            user: true,
          },
        },
        points: {
          with: {
            location: true,
          },
        },
      },
      limit: 100,
    })
  }

  static async listByCategory(categoryId: string): Promise<PageWithData[]> {
    const result = await useDatabase().query.pageCategories.findMany({
      where: (pages, { eq }) => eq(pages.categoryId, categoryId),
      with: {
        page: {
          with: {
            categories: {
              with: {
                category: true,
              },
            },
            followers: {
              with: {
                user: true,
              },
            },
            pins: {
              orderBy: (pagePins, { desc }) => desc(pagePins.createdAt),
              with: {
                user: true,
              },
            },
            points: {
              with: {
                location: true,
              },
            },
          },
        },
      },
    })

    return result.map(({ page }) => page)
  }

  static async create(data: PageDraft): Promise<PageType> {
    const result = await useDatabase().insert(pages).values(data).returning()

    if (result.length === 0) {
      throw new Error('Page creation failed: no data returned from DB')
    }

    return result[0] as PageType
  }

  static async createFollower(data: PageFollowerDraft): Promise<PageFollower> {
    const result = await useDatabase().insert(pageFollowers).values(data).returning()

    if (result.length === 0) {
      throw new Error('Page follower creation failed: no data returned from DB')
    }

    return result[0] as PageFollower
  }

  static async update(id: string, data: Omit<Partial<PageDraft>, 'id' | 'createdAt'>) {
    const [page] = await useDatabase()
      .update(pages)
      .set({
        ...data,
        updatedAt: sql`now()`,
      })
      .where(eq(pages.id, id))
      .returning()
    return page
  }

  static async delete(id: string) {
    return useDatabase().delete(pages).where(eq(pages.id, id))
  }

  static async deleteFollower(id: string) {
    await useDatabase().delete(pageFollowers).where(eq(pageFollowers.id, id))
  }

  static async recountFollowers(pageId: string) {
    const [result] = await useDatabase()
      .select({
        value: count(pageFollowers.id),
      })
      .from(pageFollowers)
      .where(eq(pageFollowers.pageId, pageId))

    const followersCount = result?.value ?? 0

    await useDatabase()
      .update(pages)
      .set({
        followersCount,
      })
      .where(eq(pages.id, pageId))
  }
}
