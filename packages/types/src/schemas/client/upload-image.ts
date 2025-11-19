import * as z from 'zod'

const MAX_FILE_SIZE = 10 * 1024 * 1024 // 10MB
const ACCEPTED_IMAGE_TYPES = ['image/jpeg', 'image/jpg', 'image/png', 'image/webp', 'image/heic', 'image/heif']

function formatBytes(bytes: number, decimals = 2) {
  if (bytes === 0) {
    return '0 Bytes'
  }
  const k = 1024
  const dm = decimals < 0 ? 0 : decimals
  const sizes = ['Bytes', 'KB', 'MB', 'GB', 'TB']
  const i = Math.floor(Math.log(bytes) / Math.log(k))
  return `${Number.parseFloat((bytes / k ** i).toFixed(dm))} ${sizes[i]}`
}

export const uploadImageSchema = z
  .instanceof(File, {
    error: 'Выберите фото.',
  })
  .refine((file) => file.size <= MAX_FILE_SIZE, {
    error: `Изображение слишком большое. Нужно меньше ${formatBytes(MAX_FILE_SIZE)}.`,
  })
  .refine((file) => ACCEPTED_IMAGE_TYPES.includes(file.type), {
    error: 'Нужен корректный тип.',
  })
