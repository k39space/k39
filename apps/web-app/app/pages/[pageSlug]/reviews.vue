<template>
  <UContainer class="mt-4 max-w-5xl">
    <div class="grid grid-cols-1 md:grid-cols-3 gap-4 md:gap-10">
      <div class="col-span-2">
        <div v-if="pageReviews?.length" class="flex flex-col gap-6">
          <span
            itemscope
            itemprop="aggregateRating"
            itemtype="https://schema.org/AggregateRating"
          >
            <meta itemprop="ratingValue" :content="page?.rating.toString()">
            <meta itemprop="reviewCount" :content="page?.reviewsCount.toString()">
            <meta itemprop="bestRating" content="5">
            <meta itemprop="worstRating" content="1">
          </span>

          <PageReviewCard
            v-for="review in pageReviews"
            :key="review.id"
            :review="review"
            :update-data="updateData"
            class="motion-preset-slide-left"
          />
        </div>
        <div v-else class="text-muted min-h-80">
          Отзывов пока нет
        </div>
      </div>

      <div class="mb-4 md:mt-4 col-span-1 order-first md:order-last">
        <div class="flex flex-col gap-8">
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

          <PageReviewUserBlock
            :page-slug="params.pageSlug"
            :review="myReview"
          />
        </div>
      </div>
    </div>
  </UContainer>
</template>

<script setup lang="ts">
const { params } = useRoute('pageSlug-reviews___ru')

const { data: page } = await useFetch(`/api/page/slug/${params.pageSlug}`)
const { data: pageReviews, execute: fetchPageReviews } = await useFetch(`/api/page/id/${page.value?.id}/review/list`)
const { data: myReview } = await useFetch(`/api/page/id/${page.value?.id}/review/my`)

function updateData() {
  fetchPageReviews()
}

const mainCategory = computed(() => page.value?.categories[0]?.category)

useBreadcrumb().setItems([
  {
    label: 'Главная',
    icon: 'i-lucide-house',
    to: '/',
  },
  {
    label: `${mainCategory.value?.title ?? ''} «${page.value?.title}»`,
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
  title: `Отзывы «${page.value?.title}»`,
})
</script>
