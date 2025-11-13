import z from 'zod'

export const createPageReviewServerSchema = z.object({
  rating: z
    .number({ error: 'Укажите оценку от 1 до 5.' })
    .min(1, { error: 'Укажите оценку от 1 до 5.' })
    .max(5, { error: 'Укажите оценку от 1 до 5.' }),
  pros: z.string().optional(),
  cons: z.string().optional(),
  comment: z.string().optional(),
  photos: z.instanceof(File, {
    message: 'Выберите фото.',
  }).array().max(10).optional(),
})
export type CreatePageReviewServerSchema = z.output<typeof createPageReviewServerSchema>
