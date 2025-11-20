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

    <div class="grid grid-cols-3 gap-10">
      <div class="col-span-2 border border-default rounded-lg h-fit p-4 sm:p-5 flex flex-col gap-5">
        <FormCreateReview
          v-if="page?.id"
          :page-id="page.id"
          :page-slug="page.slug"
        />
      </div>

      <div class="mt-4 col-span-1">
        <PageReviewEditProgress />
      </div>
    </div>
  </UContainer>
</template>

<script setup lang="ts">
const { params } = useRoute('review-new-pageSlug___ru')

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
    label: `${page.value?.categories[0]?.category?.title ?? ''} ${page.value?.title}`,
    icon: 'i-lucide-layout-template',
    to: `/${page.value?.slug}`,
  },
  {
    label: 'Новый отзыв',
    icon: 'i-lucide-user-star',
    class: 'text-dimmed font-normal',
  },
])

useHead({
  title: `Новый отзыв «${page.value?.title}»`,
})
</script>
