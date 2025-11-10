<template>
  <UContainer class="mt-4 max-w-5xl">
    <div class="grid grid-cols-3 gap-10">
      <div class="col-span-2">
        <div v-if="page?.reviews.length" class="flex flex-col gap-6">
          <PageReviewCard
            v-for="review in page?.reviews"
            :key="review.id"
            :review="review"
            class="motion-preset-slide-left"
          />
        </div>
        <div v-else class="text-muted">
          Отзывов пока нет
        </div>
      </div>

      <div class="mt-4 col-span-1">
        <PageReviewRatingBlock />
      </div>
    </div>
  </UContainer>
</template>

<script setup lang="ts">
const { params } = useRoute('pageSlug-reviews___ru')

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
    label: 'Отзывы',
    icon: 'i-lucide-user-star',
    class: 'text-dimmed font-normal',
  },
])

useHead({
  title: `Отзывы ${page.value?.title}`,
})
</script>
