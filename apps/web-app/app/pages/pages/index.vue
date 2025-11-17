<template>
  <UContainer class="max-w-5xl">
    <div class="mt-4 min-h-5">
      <UBreadcrumb
        v-if="items?.length"
        :items="items"
        :ui="{
          item: 'motion-preset-slide-up',
        }"
      />
    </div>
  </UContainer>

  <UPageHero
    orientation="vertical"
    :title="title"
    :description="description"
    :ui="{
      wrapper: 'lg:px-8',
      title: 'wrap-break-word',
      description: 'mx-auto max-w-4xl',
    }"
  />

  <UContainer class="max-w-5xl">
    <div class="flex flex-col gap-6">
      <PageSmallBlock
        v-for="page in pages"
        :key="page.id"
        :page="page"
      />
    </div>
  </UContainer>
</template>

<script setup lang="ts">
const { data: pages } = await useFetch('/api/page/list')

const { items, setItems } = useBreadcrumb()

setItems([
  {
    label: 'Главная',
    icon: 'i-lucide-house',
    to: '/',
  },
  {
    label: 'Каталог страниц',
    icon: 'i-lucide-layout-template',
    class: 'text-dimmed font-normal',
  },
])

const title = 'Каталог страниц'
const description = 'Здесь можно найти ссылку на любую страницу проекта'

useHead({
  title,
  meta: [
    {
      name: 'description',
      content: description,
    },
  ],
})
</script>
