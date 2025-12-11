<template>
  <div class="border border-default rounded-lg p-4 sm:p-5 flex flex-col gap-5 group/card">
    <div class="flex flex-col gap-4">
      <h3 class="text-lg/6 font-bold">
        {{ point.address }}
      </h3>

      <div class="flex flex-row flex-wrap gap-2">
        <UButton
          v-if="point.yandexUrl"
          :to="point.yandexUrl"
          target="_blank"
          size="lg"
          color="neutral"
          variant="soft"
          icon="i-lucide-map"
          class="w-fit"
          label="на Яндекс.Карте"
        />
        <UButton
          v-if="point.gisUrl"
          :to="point.gisUrl"
          target="_blank"
          size="lg"
          color="neutral"
          variant="soft"
          icon="i-lucide-map"
          class="w-fit"
          label="на 2ГИС"
        />
      </div>
    </div>
  </div>
</template>

<script setup lang="ts">
import type { Point } from '@k39/database'

defineProps<{ point: Point }>()
</script>
