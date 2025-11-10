<template>
  <div class="flex flex-row gap-4">
    <div class="shrink-0 relative flex flex-col justify-start">
      <img src="/img/page-avatar/muza-avatar.jpg" class="size-32 rounded-lg border border-default">
    </div>

    <div class="flex flex-col gap-3.5 justify-center">
      <div class="flex flex-col gap-2">
        <h1 class="text-3xl/6 font-bold">
          {{ page?.title }}
        </h1>

        <p class="text-base/4 text-muted">
          Кондитерская, кофейня, пекарня
        </p>

        <!-- <div class="flex flex-row gap-2 items-center">
          <img src="/img/badge/badge1.gif" class="size-8 border border-accented rounded-sm">
          <p class="text-muted">
            Знаток области X уровня
          </p>
        </div> -->
      </div>

      <div v-if="page.description" class="text-sm/5">
        {{ page.description }}
      </div>
    </div>
  </div>
</template>

<script setup lang="ts">
import type { Page } from '@k39/database'

defineProps<{ page: Page }>()
</script>
