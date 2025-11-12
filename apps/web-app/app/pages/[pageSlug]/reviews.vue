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
        <PageReviewRatingBlock
          v-if="page"
          :page-slug="page.slug"
          :rating="page.rating"
          :reviews-count="page.reviewsCount"
          :reviews-count5="page.reviewsCount5"
          :reviews-count4="page.reviewsCount4"
          :reviews-count3="page.reviewsCount3"
          :reviews-count2="page.reviewsCount2"
          :reviews-count1="page.reviewsCount1"
        />
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
