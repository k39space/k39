<template>
  <UContainer class="mt-12 max-w-4xl">
    <ContentRenderer v-if="page" :value="page" />
  </UContainer>
</template>

<script setup lang="ts">
const { data: page, error } = await useAsyncData('legal-privacy-policy', () => {
  return queryCollection('legal').path('/legal/privacy-policy').first()
})

if (!page.value || error.value) {
  throw createError({
    statusCode: 404,
    message: 'Страница не найдена',
  })
}

useHead({
  title: 'Политика конфиденциальности',
})
</script>
