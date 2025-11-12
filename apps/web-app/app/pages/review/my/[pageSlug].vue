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

    <div class="my-4 lg:py-6 flex flex-row gap-4 justify-between items-center">
      <PageSmallBlock v-if="page" :page="page" />
    </div>
  </UContainer>
</template>

<script setup lang="ts">
const { params } = useRoute('review-my-pageSlug___ru')

const { data: page, error } = await useFetch(`/api/page/slug/${params.pageSlug}`)

if (!page.value || error.value) {
  throw createError({
    statusCode: 404,
    message: 'Страница не найдена',
  })
}

const { items, setItems } = useBreadcrumb()

setItems([
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
    label: 'Отзывы',
    icon: 'i-lucide-user-star',
    to: `/${page.value?.slug}/reviews`,
  },
  {
    label: 'Мой отзыв',
    icon: 'i-lucide-user',
    class: 'text-dimmed font-normal',
  },
])

useHead({
  title: `Мой отзыв ${page.value?.title}`,
})
</script>
