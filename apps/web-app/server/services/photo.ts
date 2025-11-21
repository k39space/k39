import type { Photo, PhotoVersion, PhotoVersionFormat, PhotoVersionSize } from '@k39/database'
import type { Buffer } from 'node:buffer'
import { db } from '@k39/database'
import convert from 'heic-convert'
import sharp from 'sharp'

export const PHOTOS_MAX_COUNT_TO_UPLOAD = 10
export const PRIVATE_PHOTOS_MAX_COUNT_TO_UPLOAD = 5

const IMAGE_MAX_SIZE_BYTES_TO_UPLOAD = 10 * 1024 * 1024 // 10 MB
const IMAGE_MAX_DIMENSION_TO_UPLOAD = 8000
const IMAGE_MIN_DIMENSION_TO_UPLOAD = 200
const IMAGE_FORMATS_TO_UPLOAD: sharp.Metadata['format'][] = ['jpeg', 'jpg', 'png', 'webp', 'heif']

export const IMAGE_SIZES_TO_SAVE: { size: PhotoVersionSize, width: number, height: number }[] = [
  {
    size: 'xs',
    width: 320,
    height: 320,
  },
  {
    size: 'sm',
    width: 640,
    height: 640,
  },
  {
    size: 'md',
    width: 960,
    height: 960,
  },
  {
    size: 'lg',
    width: 1280,
    height: 1280,
  },
  {
    size: 'xl',
    width: 1920,
    height: 1920,
  },
]
export const IMAGE_FORMATS_TO_SAVE: PhotoVersionFormat[] = ['jpg', 'webp']

export async function validatePhoto(photo: FileLike): Promise<
  | { ok: false, message: string }
  | { ok: true, metadata: sharp.Metadata }
> {
  let sharpStream

  try {
    if (!photo) {
      return { ok: false, message: 'Photo is required' }
    }

    sharp.cache(false)
    sharp.concurrency(1)

    sharpStream = sharp(photo.data.buffer as ArrayBuffer)

    const metadata = await sharpStream.clone().metadata()

    if (!metadata?.format || !IMAGE_FORMATS_TO_UPLOAD.includes(metadata?.format) || !metadata?.width || !metadata?.height) {
      return { ok: false, message: 'Invalid format' }
    }

    if (metadata.width > IMAGE_MAX_DIMENSION_TO_UPLOAD || metadata.height > IMAGE_MAX_DIMENSION_TO_UPLOAD) {
      return { ok: false, message: 'Has too big dimensions' }
    }

    if (metadata.width < IMAGE_MIN_DIMENSION_TO_UPLOAD || metadata.height < IMAGE_MIN_DIMENSION_TO_UPLOAD) {
      return { ok: false, message: 'Has too small dimensions' }
    }

    if (!metadata?.size || metadata.size > IMAGE_MAX_SIZE_BYTES_TO_UPLOAD) {
      return { ok: false, message: 'Is too big' }
    }

    return { ok: true, metadata }
  } finally {
    sharpStream?.destroy()
  }
}

export async function optimizePhoto(data: {
  buffer: Buffer<ArrayBufferLike>
  format: sharp.Metadata['format']
  formatTo: PhotoVersionFormat
  sizeTo: PhotoVersionSize },
): Promise<{ metadata: sharp.Metadata, buffer: Buffer<ArrayBufferLike> } | null> {
  let sharpStream

  const size = IMAGE_SIZES_TO_SAVE.find((s) => s.size === data.sizeTo)
  if (!size) {
    return null
  }

  try {
    sharp.cache(false)
    sharp.concurrency(1)

    // If HEIF/HEIC is uploaded, then convert it to JPEG
    if (data.format === 'heif') {
      const converted = await convert({
        buffer: data.buffer as unknown as ArrayBufferLike,
        format: 'JPEG',
        quality: 1, // the jpeg compression quality, between 0 and 1
      })

      sharpStream = sharp(converted)
    } else {
      sharpStream = sharp(data.buffer)
    }

    // Resize to the required size (without going beyond) with same aspect ratio
    const optimizedBuffer = await sharpStream
      .resize(size.width, size.height, { fit: 'inside' })
      .toFormat(data.formatTo, { quality: 85 })
      .toBuffer()

    const optimizedMetadata = await sharp(optimizedBuffer).metadata()

    return {
      metadata: optimizedMetadata,
      buffer: optimizedBuffer,
    }
  } catch (error) {
    console.error(error)
    return null
  } finally {
    sharpStream?.destroy()
  }
}

export async function createAndUploadOriginalPhoto(data: {
  id: string
  buffer: Buffer
  metadata: sharp.Metadata
}): Promise<Photo | null> {
  try {
    const storage = useStorage('s3')
    const name = `original.${data.metadata.format}`
    await storage.setItemRaw(`photos/${data.id}/${name}`, data.buffer)

    return db.photo.create({
      name,
      id: data.id,
      format: data.metadata.format,
      width: data.metadata.width,
      height: data.metadata.height,
      sizeBytes: data.metadata.size ?? data.buffer.byteLength,
    })
  } catch (error) {
    console.error(error)
    return null
  }
}

export async function createAndUploadPhotoVersion(data: {
  photoId: string
  size: PhotoVersionSize
  buffer: Buffer
  metadata: sharp.Metadata
}): Promise<PhotoVersion | null> {
  try {
    const storage = useStorage('s3')
    const name = `${data.size}.${data.metadata.format}`
    await storage.setItemRaw(`photos/${data.photoId}/${name}`, data.buffer)

    return db.photo.createVersion({
      name,
      photoId: data.photoId,
      size: data.size,
      format: data.metadata.format as PhotoVersionFormat,
      width: data.metadata.width,
      height: data.metadata.height,
      sizeBytes: data.metadata.size ?? data.buffer.byteLength,
    })
  } catch (error) {
    console.error(error)
    return null
  }
}
