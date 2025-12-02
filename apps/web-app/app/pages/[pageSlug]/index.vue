<template>
  <UContainer class="mt-4 max-w-5xl">
    <div class="grid grid-cols-3 gap-10">
      <div class="col-span-2">
        <div class="text-muted">
          Постов пока нет
        </div>
      </div>
    </div>
  </UContainer>
</template>

<script setup lang="ts">
const { params } = useRoute('pageSlug___ru')

const { data: page } = await useFetch(`/api/page/slug/${params.pageSlug}`)

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
    class: 'text-dimmed font-normal',
  },
])

useHead({
  title: `${mainCategory.value?.title ?? ''} «${page.value?.title}»`,
})
</script>
