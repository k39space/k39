import type { PageDraft, Page as PageType } from '../types'
import { eq, sql } from 'drizzle-orm'
import { useDatabase } from '../database'
import { pages } from '../tables'

export class Page {
  static async find(id: string): Promise<PageType | undefined> {
    return useDatabase().query.pages.findFirst({
      where: (pages, { eq }) => eq(pages.id, id),
    })
  }

  static async findBySlug(slug: string): Promise<PageType | undefined> {
    return useDatabase().query.pages.findFirst({
      where: (pages, { eq }) => eq(pages.slug, slug),
    })
  }

  static async list() {
    return useDatabase().query.pages.findMany({
      limit: 100,
    })
  }

  static async create(data: PageDraft): Promise<PageType> {
    const result = await useDatabase().insert(pages).values(data).returning()

    if (result.length === 0) {
      throw new Error('Page creation failed: no data returned from DB')
    }

    return result[0] as PageType
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
}
