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

    <UTooltip text="Открыть отзывы">
      <ULink :to="url" class="hover:opacity-80 transition duration-200">
        <div class="h-8 flex items-center">
          <RatingStars :rating="rating" />
        </div>
      </ULink>
    </UTooltip>
  </div>
</template>

<script lang="ts" setup>
defineProps<{ rating: number, url: string }>()
</script>
