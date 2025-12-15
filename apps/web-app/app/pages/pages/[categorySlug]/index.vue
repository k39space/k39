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
const { params } = useRoute('pages-categorySlug___ru')

const { data: category, error } = await useFetch(`/api/category/slug/${params.categorySlug}`)

if (!category.value || error.value) {
  throw createError({
    statusCode: 404,
    message: 'Категория не найдена',
  })
}

const { data: pages } = await useFetch(`/api/page/category/${category.value.id}/list`)

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
    to: '/pages',
  },
  {
    label: category.value?.title,
    icon: 'i-lucide-tag',
    class: 'text-dimmed font-normal',
  },
])

const title = `${category.value?.title}`

useHead({
  title,
})
</script>
