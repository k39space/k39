<template>
  <UContainer class="max-w-5xl">
    Постов пока нет
  </UContainer>
</template>

<script setup lang="ts">
const { params } = useRoute('pageSlug___ru')

const { data: page } = await useFetch(`/api/page/slug/${params.pageSlug}`)

useBreadcrumb().setItems([
  {
    label: 'Главная',
    icon: 'i-lucide-house',
    to: '/',
  },
  {
    label: `Кондитерская ${page.value?.title}`,
    icon: 'i-lucide-layout-template',
    class: 'text-dimmed font-normal',
  },
])

useHead({
  title: page.value?.title,
})
</script>
