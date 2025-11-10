<template>
  <UContainer class="max-w-5xl">
    Адресов пока нет
  </UContainer>
</template>

<script setup lang="ts">
const { params } = useRoute('pageSlug-points___ru')

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
    to: `/${page.value?.slug}`,
  },
  {
    label: 'Филиалы',
    icon: 'i-lucide-map',
    class: 'text-dimmed font-normal',
  },
])

useHead({
  title: `Адреса ${page.value?.title}`,
})
</script>
