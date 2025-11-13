import * as z from 'zod'

const MAX_FILE_SIZE = 10 * 1024 * 1024 // 10MB
const MIN_DIMENSIONS = { width: 200, height: 200 }
const MAX_DIMENSIONS = { width: 4096, height: 4096 }
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
  .refine(
    (file) =>
      new Promise((resolve) => {
        const reader = new FileReader()
        reader.onerror = () => resolve(false)
        reader.onload = (e) => {
          const img = new HTMLImageElement()
          img.onerror = () => resolve(false)
          img.onload = () => {
            const meetsDimensions
              = img.width >= MIN_DIMENSIONS.width
                && img.height >= MIN_DIMENSIONS.height
                && img.width <= MAX_DIMENSIONS.width
                && img.height <= MAX_DIMENSIONS.height
            resolve(meetsDimensions)
          }
          img.src = e.target?.result as string
        }
        reader.readAsDataURL(file)
      }),
    {
      error: `Недопустимые размеры изображения. Загрузите изображение размером от ${MIN_DIMENSIONS.width}x${MIN_DIMENSIONS.height} до ${MAX_DIMENSIONS.width}x${MAX_DIMENSIONS.height} пикс.`,
    },
  )
