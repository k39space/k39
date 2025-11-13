import z from 'zod'

export const createPageReviewClientSchema = z.object({
  rating: z
    .number({ error: 'Укажите оценку от 1 до 5.' })
    .min(1, { error: 'Укажите оценку от 1 до 5.' })
    .max(5, { error: 'Укажите оценку от 1 до 5.' }),
  pros: z.string().optional(),
  cons: z.string().optional(),
  comment: z.string().optional(),
  photos: imageSchema.array().max(10).optional(),
})
export type CreatePageReviewClientSchema = z.output<typeof createPageReviewClientSchema>
