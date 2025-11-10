<template>
  <div class="flex flex-col gap-8">
    <div class="flex flex-col gap-2">
      <div class="flex flex-row gap-3.5">
        <h4 class="text-4xl font-bold">
          {{ innerRating.toFixed(1) }}
        </h4>

        <div class="flex flex-col">
          <RatingStars :rating="innerRating" />

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
        class="mt-2.5"
        label="Написать отзыв"
        @click="tryActionThatRequiresAuth()"
      />
    </div>
  </div>
</template>

<script lang="ts" setup>
const innerRating = computed(() => 4.7)
const reviewsCount = computed(() => 6)

const ratings = computed(() => [
  {
    rating: 5,
    count: 4,
    percent: 100 / 6 * 4,
  },
  {
    rating: 4,
    count: 1,
    percent: 100 / 6 * 1,
  },
  {
    rating: 3,
    count: 1,
    percent: 100 / 6 * 1,
  },
  {
    rating: 2,
    count: 0,
    percent: 0,
  },
  {
    rating: 1,
    count: 0,
    percent: 0,
  },
])
</script>
