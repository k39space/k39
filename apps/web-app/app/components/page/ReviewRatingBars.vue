<template>
  <div class="flex flex-col gap-0">
    <div
      v-for="rating in sortedRatings"
      :key="rating.rating"
      class="flex flex-row gap-2 items-center"
    >
      <p class="text-base/5">
        {{ rating.rating }}
      </p>
      <UProgress
        :model-value="rating.percent"
        :ui="{
          indicator: 'bg-amber-300 motion-preset-slide-right',
          base: 'bg-elevated',
        }"
      />
    </div>
  </div>
</template>

<script setup lang="ts">
const { ratings } = defineProps<{ ratings: { rating: number, percent: number }[] }>()

// 5 to 1
const sortedRatings = computed(() => ratings.toSorted((a, b) => b.rating - a.rating))
</script>
