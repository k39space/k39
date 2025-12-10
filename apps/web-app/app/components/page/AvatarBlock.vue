<template>
  <div class="flex flex-col md:flex-row gap-4">
    <div class="size-35 shrink-0 aspect-square rounded-lg border border-default">
      <img
        :src="page.avatarUrl ?? ''"
        :alt="`Аватар страницы «${page.title}»`"
        class="w-full h-full object-cover rounded-lg"
      >
    </div>

    <div class="flex flex-col gap-3.5 justify-center">
      <div class="flex flex-col gap-2">
        <h1 class="text-3xl/6 font-bold">
          {{ page?.title }}
        </h1>

        <PageCategoriesList :categories="page.categories" />
      </div>

      <div v-if="page.description" class="text-sm/5">
        {{ page.description }}
      </div>
    </div>
  </div>
</template>

<script setup lang="ts">
import type { PageWithData } from '@k39/database'

defineProps<{ page: PageWithData }>()
</script>
