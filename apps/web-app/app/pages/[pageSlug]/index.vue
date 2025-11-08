<template>
  <UContainer class="max-w-4xl">
    Постов пока нет
  </UContainer>
</template>

<script setup lang="ts">
const { params } = useRoute('pageSlug___ru')

useHead({
  title: params.pageSlug,
})
</script>
