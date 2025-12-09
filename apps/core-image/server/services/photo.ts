import type { PhotoVersion, PhotoVersionFormat, PhotoVersionSize } from '@k39/database'
import type { Buffer } from 'node:buffer'
import { db } from '@k39/database'
import convert from 'heic-convert'
import sharp from 'sharp'

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

export async function prepareSharp(format: sharp.Metadata['format'], buffer: Buffer<ArrayBufferLike>): Promise<sharp.Sharp | null> {
  let sharpStream: sharp.Sharp

  sharp.cache(false)
  sharp.concurrency(1)

  try {
    // If HEIF/HEIC is uploaded, then convert it to JPEG
    if (format === 'heif') {
      const converted = await convert({
        buffer: buffer as unknown as ArrayBufferLike,
        format: 'JPEG',
        quality: 1, // the jpeg compression quality, between 0 and 1
      })

      sharpStream = sharp(converted)
    } else {
      sharpStream = sharp(buffer)
    }

    return sharpStream
  } catch (error) {
    console.error(error)
    return null
  }
}

export async function optimizePhoto(data: {
  sharpStream: sharp.Sharp
  format: sharp.Metadata['format']
  formatTo: PhotoVersionFormat
  sizeTo: PhotoVersionSize },
): Promise<{ metadata: sharp.Metadata, buffer: Buffer<ArrayBufferLike> } | null> {
  const size = IMAGE_SIZES_TO_SAVE.find((s) => s.size === data.sizeTo)
  if (!size) {
    return null
  }

  try {
    // Resize to the required size (without going beyond) with same aspect ratio
    const optimizedBuffer = await data.sharpStream
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
