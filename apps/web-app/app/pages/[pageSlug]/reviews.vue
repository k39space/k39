<template>
  <UContainer class="max-w-4xl">
    Тут пока пусто
  </UContainer>
</template>

<script setup lang="ts">
const { params } = useRoute('pageSlug-reviews___ru')

useHead({
  title: `Отзывы ${params.pageSlug}`,
})
</script>
