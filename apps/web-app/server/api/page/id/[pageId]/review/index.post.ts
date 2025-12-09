import type { PageReviewPhotoType } from '@k39/database'
import { db } from '@k39/database'
import { createPageReviewServerSchema } from '@k39/types/server'
import { createId } from '@paralleldrive/cuid2'
import { createAndUploadOriginalPhoto, createAndUploadPhotoVersion, IMAGE_FORMATS_TO_SAVE, IMAGE_SIZES_TO_SAVE, optimizePhoto, PHOTOS_MAX_COUNT_TO_UPLOAD, PRIVATE_PHOTOS_MAX_COUNT_TO_UPLOAD, validatePhoto } from '~~/server/services/photo'

export default defineEventHandler(async (event) => {
  try {
    const pageId = getRouterParam(event, 'pageId')
    if (!pageId) {
      throw createError({
        statusCode: 400,
        statusMessage: 'Id is required',
      })
    }

    const pageInDb = await db.page.find(pageId)
    if (!pageInDb) {
      throw createError({
        statusCode: 404,
        statusMessage: 'Page not found',
      })
    }

    const user = await getUserFromSession(event)

    // Guard: Check if user already reviewed this page
    const pageReviewInDb = await db.pageReview.findByPageIdAndUserId(pageId, user.id)
    if (pageReviewInDb) {
      throw createError({
        statusCode: 409,
        statusMessage: 'Conflict',
        data: {
          code: 'PAGE_REVIEW_ALREADY_EXISTS',
          message: 'У вас уже есть отзыв.',
        },
      })
    }

    const formData = await readMultipartFormData(event)
    if (!formData) {
      throw createError({
        statusCode: 400,
        statusMessage: 'Form data is required',
      })
    }

    const fields: Record<string, string> = {}
    const photos: (OriginalPhoto & { type: PageReviewPhotoType })[] = []

    for (const item of formData) {
      if (!item.name) {
        continue
      }
      if (item.name === 'photos' || item.name === 'privatePhotos') {
        const itemValidated = await validatePhoto(item)
        if (!itemValidated.ok) {
          continue
        }

        if (item.name === 'photos' && photos.filter((photo) => photo.type === 'public').length < PHOTOS_MAX_COUNT_TO_UPLOAD) {
          photos.push({
            ...item,
            id: createId(),
            metadata: itemValidated.metadata,
            type: 'public',
          })
        }

        if (item.name === 'privatePhotos' && photos.filter((photo) => photo.type === 'private').length < PRIVATE_PHOTOS_MAX_COUNT_TO_UPLOAD) {
          photos.push({
            ...item,
            id: createId(),
            metadata: itemValidated.metadata,
            type: 'private',
          })
        }

        continue
      }

      fields[item.name] = item.data.toString()
    }

    const parsedFields = {
      ...fields,
      rating: Number(fields.rating),
    }

    const data = createPageReviewServerSchema.parse(parsedFields)

    const review = await db.pageReview.create({
      pageId,
      userId: user.id,
      rating: data.rating,
      pros: data.pros,
      cons: data.cons,
      comment: data.comment,
      privateComment: data.privateComment,
      recommends: data.recommends === 'yes',
    })

    // Upload Photos
    for (const photo of photos) {
      await createAndUploadOriginalPhoto({
        id: photo.id,
        buffer: photo.data,
        metadata: photo.metadata,
      })

      await db.pageReview.createPhoto({
        type: photo.type,
        pageReviewId: review.id,
        photoId: photo.id,
      })

      // PhotoVersions
      await optimizeAllPhotos(photo)
    }

    return {
      ok: true,
      result: review,
    }
  } catch (error) {
    throw errorResolver(error)
  }
})

async function optimizeAllPhotos(photo: OriginalPhoto) {
  // Create all possible formats
  for (const format of IMAGE_FORMATS_TO_SAVE) {
    // Create all possible sizes
    for (const size of IMAGE_SIZES_TO_SAVE) {
      const isSmaller = photo.metadata.width < size.width || photo.metadata.height < size.height
      if (isSmaller) {
        continue
      }

      const optimizedPhoto = await optimizePhoto({
        sizeTo: size.size,
        buffer: photo.data,
        format: photo.metadata.format,
        formatTo: format,
      })

      if (optimizedPhoto) {
        await createAndUploadPhotoVersion({
          photoId: photo.id,
          size: size.size,
          buffer: optimizedPhoto.buffer,
          metadata: optimizedPhoto.metadata,
        })
      }
    }
  }
}
