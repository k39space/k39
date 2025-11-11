<template>
  <div class="flex flex-col gap-8">
    <div class="flex flex-col gap-2">
      <div class="flex flex-row gap-3.5">
        <h4 class="text-4xl font-bold">
          {{ rating.toFixed(1) }}
        </h4>

        <div class="flex flex-col">
          <RatingStars :rating="rating" />

          <p class="text-sm text-muted">
            {{ reviewsCount }} {{ pluralizationRu(reviewsCount, ['отзыв', 'отзыва', 'отзывов']) }}
          </p>
        </div>
      </div>

      <PageReviewRatingBars :ratings="ratings" />
    </div>

    <div class="flex flex-col gap-2">
      <h4 class="text-xl/5 font-bold">
        Поделитесь впечатлениями
      </h4>

      <p class="text-base/5">
        Расскажите, что вам запомнилось — вашим отзывом вы согреете наше сердце
      </p>

      <UButton
        icon="i-lucide-edit"
        size="xl"
        color="primary"
        variant="solid"
        block
        class="mt-2.5 motion-preset-slide-up"
        label="Написать отзыв"
        @click="tryActionThatRequiresAuth()"
      />
    </div>
  </div>
</template>

<script lang="ts" setup>
const props = defineProps<{
  rating: number
  reviewsCount: number
  reviewsCount5: number
  reviewsCount4: number
  reviewsCount3: number
  reviewsCount2: number
  reviewsCount1: number
}>()

const ratingKeys = [5, 4, 3, 2, 1] as const

const ratings = computed(() => {
  if (props.reviewsCount === 0) {
    return ratingKeys.map((r) => ({ rating: r, percent: 0 }))
  }

  return ratingKeys.map((r) => {
    const count = props[`reviewsCount${r}` as keyof typeof props]
    return {
      rating: r,
      percent: Math.round((count / props.reviewsCount) * 100),
    }
  })
})
</script>
