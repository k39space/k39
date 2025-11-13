import * as z from 'zod'
import { uploadImageSchema } from './upload-image'

export const createPageReviewClientSchema = z.object({
  rating: z
    .number({ error: 'Укажите оценку от 1 до 5.' })
    .min(1, { error: 'Укажите оценку от 1 до 5.' })
    .max(5, { error: 'Укажите оценку от 1 до 5.' }),
  pros: z.string().optional(),
  cons: z.string().optional(),
  comment: z.string().optional(),
  photos: uploadImageSchema
    .array()
    .max(10, { error: 'Можно загрузить максимум 10 фотографий.' })
    .optional(),
})
export type CreatePageReviewClientSchema = z.output<typeof createPageReviewClientSchema>
