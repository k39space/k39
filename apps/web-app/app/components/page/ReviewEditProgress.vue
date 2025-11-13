<template>
  <div class="flex flex-col gap-8">
    <div class="flex flex-col gap-2">
      <h4 class="text-4xl font-bold">
        Уровень заполненности
      </h4>

      <UProgress
        :model-value="progress"
        color="success"
        size="xl"
        status
        :ui="{
          status: 'text-primary text-lg/5 font-serif font-bold',
          base: 'bg-elevated',
          indicator: 'motion-preset-slide-right',
        }"
        class="mt-2"
      />

      <p>
        Чем полнее отзыв — тем полезнее он для других.
      </p>
    </div>

    <div class="flex flex-col gap-3.5">
      <h4 class="text-xl/5 font-bold">
        Что осталось сделать:
      </h4>

      <div class="flex flex-col gap-2.5">
        <div
          v-for="item in list"
          :key="item.label"
          class="flex flex-row gap-2 items-start"
        >
          <UIcon
            v-if="item.completed"
            name="i-lucide-check"
            class="size-5 text-success"
          />
          <UIcon
            v-else
            name="i-lucide-circle-dashed"
            class="size-5 text-muted/25 motion-rotate-loop-180 motion-duration-2000"
          />

          <p class="text-base/5">
            {{ item.label }}
          </p>
        </div>
      </div>
    </div>
  </div>
</template>

<script setup lang="ts">
const { list, progress } = usePageReview()
</script>
