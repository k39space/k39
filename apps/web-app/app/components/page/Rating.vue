<template>
  <div class="flex flex-col gap-2 items-end">
    <div>
      <h4 class="text-right text-2xl/6 font-bold">
        {{ rating.toFixed(1) }}
      </h4>
      <p class="text-sm text-muted">
        Общий рейтинг
      </p>
    </div>

    <div class="h-8 flex flex-row gap-0 items-center">
      <RatingStars :rating="rating" />
    </div>
  </div>
</template>

<script lang="ts" setup>
defineProps<{ rating: number }>()
</script>
