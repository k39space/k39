<template>
  <UContainer>
    <UBreadcrumb :items="breadcrumbItems" class="mt-4" />

    {{ params.username }}
  </UContainer>
</template>

<script setup lang="ts">
import type { BreadcrumbItem } from '@nuxt/ui'

const { params } = useRoute('u-username___ru')

const breadcrumbItems = computed<BreadcrumbItem[]>(() => [
  {
    label: 'Главная',
    icon: 'i-lucide-house',
    to: '/',
  },
  {
    label: 'Пользователь',
    icon: 'i-lucide-user',
  },
])

useHead({
  title: params.username,
})
</script>
