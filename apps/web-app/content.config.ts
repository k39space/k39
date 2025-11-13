import { defineCollection, defineContentConfig } from '@nuxt/content'

export default defineContentConfig({
  collections: {
    legal: defineCollection({
      type: 'page',
      source: 'legal/*.md',
    }),
  },
})
