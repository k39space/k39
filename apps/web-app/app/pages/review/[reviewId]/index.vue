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

    Страница отзыва
  </UContainer>
</template>

<script setup lang="ts">
const { params } = useRoute('review-reviewId___ru')

const { data: review, error: reviewError } = await useFetch(`/api/page/review/id/${params.reviewId}`)

if (!review.value || reviewError.value) {
  throw createError({
    statusCode: 404,
    message: 'Отзыв не найден',
  })
}

const { data: page, error: pageError } = await useFetch(`/api/page/slug/${review.value.page.slug}`)

if (!page.value || pageError.value) {
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
    label: 'Отзыв пользователя',
    icon: 'i-lucide-user',
    class: 'text-dimmed font-normal',
  },
])

useHead({
  title: `Отзыв ${page.value?.title}`,
})
</script>
