<template>
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
</template>

<script lang="ts" setup>
const props = defineProps<{
  pageSlug: string
  rating: number
  reviewsCount: number
  reviewsCount5: number
  reviewsCount4: number
  reviewsCount3: number
  reviewsCount2: number
  reviewsCount1: number
}>()

const ratingMap = {
  5: props.reviewsCount5,
  4: props.reviewsCount4,
  3: props.reviewsCount3,
  2: props.reviewsCount2,
  1: props.reviewsCount1,
}

const ratings = computed<{ rating: number, percent: number }[]>(() => {
  if (props.reviewsCount === 0) {
    return Object.entries(ratingMap).map(([rating]) => ({
      rating: Number(rating),
      percent: 0,
    }))
  }

  return Object.entries(ratingMap).map(([rating, count]) => ({
    rating: Number(rating),
    percent: Math.round((count / props.reviewsCount) * 100),
  }))
})
</script>
