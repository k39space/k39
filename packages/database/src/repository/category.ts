import { useDatabase } from '../database'

export class Category {
  static async find(id: string) {
    return useDatabase().query.categories.findFirst({
      where: (categories, { eq }) => eq(categories.id, id),
    })
  }

  static async findBySlug(slug: string) {
    return useDatabase().query.categories.findFirst({
      where: (categories, { eq }) => eq(categories.slug, slug),
    })
  }
}
