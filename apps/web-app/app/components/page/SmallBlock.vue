<template>
  <div class="flex flex-row gap-4">
    <div class="shrink-0 relative flex flex-col justify-start">
      <img src="/img/page-avatar/muza-avatar.jpg" class="size-24 rounded-lg border border-default">
    </div>

    <div class="flex flex-col gap-3.5 justify-center">
      <div class="flex flex-col gap-2">
        <h1 class="text-3xl/6 font-bold">
          {{ page?.title }}
        </h1>

        <PageCategoriesList :categories="page.categories" />
      </div>

      <UButton
        v-if="page"
        :to="`/${page.slug}`"
        color="neutral"
        variant="soft"
        icon="i-lucide-arrow-right"
        label="Перейти"
        block
        class="max-w-40"
      />
    </div>
  </div>
</template>

<script setup lang="ts">
import type { PageWithData } from '@k39/database'

const { page } = defineProps<{ page: PageWithData }>()
</script>
