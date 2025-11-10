<template>
  <div>
    <div
      v-for="rating in ratings"
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
const { ratings } = defineProps<{ ratings: { rating: number, count: number, percent: number }[] }>()
</script>
