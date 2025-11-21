import * as z from 'zod'
import { uploadImageSchema } from './upload-image'

export const createPageReviewClientSchema = z.object({
  rating: z
    .number({ error: 'Укажите оценку от 1 до 5.' })
    .min(1, { error: 'Укажите оценку от 1 до 5.' })
    .max(5, { error: 'Укажите оценку от 1 до 5.' }),
  recommends: z.string({ error: 'Укажите, рекомендуете ли вы другим.' }),
  pros: z.string().max(1000, { error: 'Максимум 1000 символов.' }).optional(),
  cons: z.string().max(1000, { error: 'Максимум 1000 символов.' }).optional(),
  comment: z.string().max(3000, { error: 'Максимум 3000 символов.' }).optional(),
  privateComment: z.string().max(3000, { error: 'Максимум 3000 символов.' }).optional(),
  photos: uploadImageSchema
    .array()
    .max(10, { error: 'Можно загрузить максимум 10 фотографий.' })
    .optional(),
  privatePhotos: uploadImageSchema
    .array()
    .max(5, { error: 'Можно загрузить максимум 5 фотографий.' })
    .optional(),
})
export type CreatePageReviewClientSchema = z.output<typeof createPageReviewClientSchema>
