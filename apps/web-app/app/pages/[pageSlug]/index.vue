<template>
  <PagePinsBlock v-if="page?.pins" :pins="page.pins" />

  <!-- <UContainer class="mt-4 max-w-5xl">
    <div class="grid grid-cols-3 gap-10">
      <div class="col-span-2">
        <div class="text-muted min-h-80">
          Постов пока нет
        </div>
      </div>
    </div>
  </UContainer> -->
</template>

<script setup lang="ts">
const { params } = useRoute('pageSlug___ru')

const { data: page } = await useFetch(`/api/page/slug/${params.pageSlug}`)

const mainCategory = computed(() => page.value?.categories[0]?.category)

const breadcrumbItems = computed(() => [
  {
    label: 'Главная',
    icon: 'i-lucide-house',
    to: '/',
  },
  {
    label: `${mainCategory.value?.title ?? ''} «${page.value?.title}»`,
    icon: 'i-lucide-layout-template',
    class: 'text-dimmed font-normal',
  },
])

useBreadcrumb().setItems(breadcrumbItems.value)

useSchemaOrg([
  defineBreadcrumb({
    '@type': 'BreadcrumbList',
    'itemListElement': breadcrumbItems.value.map((item, index) => ({
      '@type': 'ListItem',
      'position': index + 1,
      'name': item.label,
      'item': item.to ?? undefined,
    })),
  }),
])

useHead({
  title: `${mainCategory.value?.title ?? ''} «${page.value?.title}»`,
})
</script>
