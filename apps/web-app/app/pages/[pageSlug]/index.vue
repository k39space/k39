<template>
  <UContainer>
    <UBreadcrumb :items="breadcrumbItems" class="mt-4" />

    {{ params.pageSlug }}
  </UContainer>
</template>

<script setup lang="ts">
import type { BreadcrumbItem } from '@nuxt/ui'

const { params } = useRoute('pageSlug___ru')

const breadcrumbItems = computed<BreadcrumbItem[]>(() => [
  {
    label: 'Главная',
    icon: 'i-lucide-house',
    to: '/',
  },
  {
    label: 'Страница',
    icon: 'i-lucide-map',
  },
])

useHead({
  title: params.pageSlug,
})
</script>
