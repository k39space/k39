<template>
  <ul class="w-fit flex flex-row gap-0.5 text-base/4 text-muted">
    <li
      v-for="(category, index) in categories"
      :key="category.id"
      class="not-last:after:content-[',']"
    >
      <ULink
        :to="`/pages/${category.category.slug}`"
        :class="[
          index > 0 && 'lowercase',
        ]"
      >
        {{ category.category.title }}
      </ULink>
    </li>
  </ul>
</template>

<script setup lang="ts">
import type { PageCategoryWithData } from '@k39/database'

defineProps<{ categories: PageCategoryWithData[] }>()
</script>
