import type { Photo, PhotoVersion, PhotoVersionFormat, PhotoVersionSize } from '@k39/database'
import type { Buffer } from 'node:buffer'
import { db } from '@k39/database'
import sharp from 'sharp'

export const PHOTOS_MAX_COUNT_TO_UPLOAD = 10
export const PRIVATE_PHOTOS_MAX_COUNT_TO_UPLOAD = 5

const IMAGE_MAX_SIZE_BYTES_TO_UPLOAD = 10 * 1024 * 1024 // 10 MB
const IMAGE_MAX_DIMENSION_TO_UPLOAD = 8000
const IMAGE_MIN_DIMENSION_TO_UPLOAD = 200
const IMAGE_FORMATS_TO_UPLOAD: sharp.Metadata['format'][] = ['jpeg', 'jpg', 'png', 'webp', 'heif']

const IMAGE_SIZES_TO_SAVE: { size: PhotoVersionSize, width: number, height: number }[] = [
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
const _IMAGE_FORMATS_TO_SAVE: PhotoVersionFormat[] = ['jpg', 'webp']

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

export async function optimizePhoto(data: { buffer: Buffer, format: sharp.Metadata['format'], size: PhotoVersionSize }): Promise<{ metadata: sharp.Metadata, buffer: Buffer } | null> {
  let sharpStream

  const size = IMAGE_SIZES_TO_SAVE.find((s) => s.size === data.size)
  if (!size) {
    return null
  }

  try {
    const validated = await validatePhoto({
      data: data.buffer,
    })
    if (!validated.ok) {
      return null
    }

    sharp.cache(false)
    sharp.concurrency(1)

    sharpStream = sharp(data.buffer)

    const buffer = await sharpStream
      .resize({
        width: size.width,
        height: size.height,
        fit: 'cover',
        position: 'center',
      })
      .toFormat(data.format, { quality: 80 })
      .toBuffer()

    return {
      metadata: validated.metadata,
      buffer,
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
  id: string
  size: PhotoVersionSize
  buffer: Buffer
  metadata: sharp.Metadata
}): Promise<PhotoVersion | null> {
  try {
    const storage = useStorage('s3')
    const name = `${data.size}.${data.metadata.format}`
    await storage.setItemRaw(`photos/${data.id}/${name}`, data.buffer)

    return db.photo.createVersion({
      name,
      photoId: data.photoId,
      id: data.id,
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
