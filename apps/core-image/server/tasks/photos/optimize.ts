import type { Photo } from '@k39/database'
import type { Metadata } from 'sharp'
import { Buffer } from 'node:buffer'
import process from 'node:process'
import { db } from '@k39/database'
import { createAndUploadPhotoVersion, IMAGE_FORMATS_TO_SAVE, IMAGE_SIZES_TO_SAVE, optimizePhoto, prepareSharp } from '~~/server/services/photo'

const logger = useLogger('task:photos:optimize')

export default defineTask({
  meta: {
    name: 'photos:optimize',
    description: 'Take original photos and optimize them',
  },
  async run() {
    if (process.env.NODE_ENV !== 'production') {
      logger.info('Skipping task in non-production environment')
      return { result: true }
    }

    try {
      const photoToOptimize = await db.photo.findUnoptimized()
      if (!photoToOptimize) {
        return { result: true }
      }

      logger.log(`Memory usage: ${process.memoryUsage().rss / 1024 / 1024} MB`)

      const storage = useStorage('s3')

      // Take original from storage
      const file = await storage.getItemRaw(`photos/${photoToOptimize.id}/${photoToOptimize.name}`)
      if (!file) {
        logger.error(`Could not find original photo ${photoToOptimize.id}/${photoToOptimize.name}`)
        return { result: true }
      }

      const buffer = Buffer.from(file)

      const res = await createAllFormatsAndSizes(photoToOptimize, buffer)
      if (!res) {
        logger.error(`Could not optimize photo ${photoToOptimize.id}/${photoToOptimize.name}`)
        return { result: true }
      }

      logger.success(`Optimized photo ${photoToOptimize.id}/${photoToOptimize.name}`)
      await db.photo.update(photoToOptimize.id, { isOptimized: true })
    } catch (error) {
      errorResolver(error)
    }

    return { result: true }
  },
})

/**
 * Create all possible formats and sizes
 */
async function createAllFormatsAndSizes(data: Photo, buffer: Buffer<ArrayBufferLike>): Promise<boolean> {
  const sharpStream = await prepareSharp(data.format as Metadata['format'], buffer)
  if (!sharpStream) {
    // Error?
    return false
  }

  for (const formatTo of IMAGE_FORMATS_TO_SAVE) {
    for (const sizeTo of IMAGE_SIZES_TO_SAVE) {
      const isSmaller = data.width < sizeTo.width || data.height < sizeTo.height
      if (isSmaller) {
        continue
      }

      const optimizedPhoto = await optimizePhoto({
        sharpStream,
        sizeTo: sizeTo.size,
        format: data.format as Metadata['format'],
        formatTo,
      })
      if (!optimizedPhoto) {
        // Error?
        return false
      }

      await createAndUploadPhotoVersion({
        photoId: data.id,
        size: sizeTo.size,
        buffer: optimizedPhoto.buffer,
        metadata: optimizedPhoto.metadata,
      })
    }
  }

  sharpStream?.destroy()

  return true
}
