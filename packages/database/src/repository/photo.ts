import type { PhotoDraft, Photo as PhotoType, PhotoVersionDraft, PhotoVersion as PhotoVersionType } from '../types'
import { eq, sql } from 'drizzle-orm'
import { useDatabase } from '../database'
import { photos, photoVersions } from '../tables'

export class Photo {
  static async find(id: string) {
    return useDatabase().query.photos.findFirst({
      where: (photos, { eq }) => eq(photos.id, id),
      with: {
        versions: true,
      },
    })
  }

  static async findUnoptimized() {
    return useDatabase().query.photos.findFirst({
      where: (photos, { eq }) => eq(photos.isOptimized, false),
    })
  }

  static async create(data: PhotoDraft): Promise<PhotoType> {
    const result = await useDatabase().insert(photos).values(data).returning()

    if (result.length === 0) {
      throw new Error('Creation failed: no data returned from DB')
    }

    return result[0] as PhotoType
  }

  static async createVersion(data: PhotoVersionDraft): Promise<PhotoVersionType> {
    const result = await useDatabase().insert(photoVersions).values(data).returning()

    if (result.length === 0) {
      throw new Error('Creation failed: no data returned from DB')
    }

    return result[0] as PhotoVersionType
  }

  static async update(id: string, data: Omit<Partial<PhotoDraft>, 'id' | 'createdAt'>) {
    const [photo] = await useDatabase()
      .update(photos)
      .set({
        ...data,
        updatedAt: sql`now()`,
      })
      .where(eq(photos.id, id))
      .returning()

    return photo
  }

  static async delete(id: string) {
    return useDatabase().delete(photos).where(eq(photos.id, id))
  }
}
