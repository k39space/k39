<template>
  <UContainer class="mt-12 max-w-4xl">
    <ContentRenderer v-if="page" :value="page" />
  </UContainer>
</template>

<script setup lang="ts">
const { data: page } = await useAsyncData('legal-privacy-policy', () => {
  return queryCollection('legal').path('/legal/privacy-policy').first()
})

useHead({
  title: 'Политика конфиденциальности',
})
</script>
