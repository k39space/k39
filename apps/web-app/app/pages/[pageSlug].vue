<template>
  <UContainer class="max-w-4xl">
    <UBreadcrumb :items="breadcrumbItems" class="mt-4" />

    <div class="my-4 lg:py-6 flex flex-col gap-4">
      <div class="flex flex-col lg:flex-row gap-2 justify-between items-center">
        <PageAvatarBlock v-if="page" :page="page" />

        <div class="flex flex-row gap-6">
          <PageFollowers
            :avatars="followers.top"
            :count="followers.count"
          />

          <PageRating :rating="page?.rating ?? 0" />
        </div>
      </div>
    </div>
  </UContainer>

  <UContainer class="max-w-4xl">
    <div class="shrink-0 flex items-center justify-between border border-default rounded-xl px-4 sm:px-6 gap-1.5 overflow-x-auto min-h-[49px]">
      <nav class="relative flex gap-1.5 [&>div]:min-w-0 items-center justify-between -mx-1 flex-1">
        <UNavigationMenu
          :items="submenuItems"
          highlight
          class="flex-1 -ml-2.5"
        />
      </nav>
    </div>
  </UContainer>

  <NuxtPage />
</template>

<script setup lang="ts">
import type { BreadcrumbItem, NavigationMenuItem } from '@nuxt/ui'

const { params } = useRoute('pageSlug___ru')

const { data: page } = await useFetch(`/api/page/slug/${params.pageSlug}`)

if (!page.value) {
  await navigateTo('/')
}

const submenuItems = computed<NavigationMenuItem[]>(() => [
  {
    label: 'Лента постов',
    to: `/${params.pageSlug}`,
    icon: 'i-lucide-newspaper',
    exact: true,
  },
  {
    label: 'Отзывы',
    to: `/${params.pageSlug}/reviews`,
    icon: 'i-lucide-user-star',
  },
])

const breadcrumbItems = computed<BreadcrumbItem[]>(() => [
  {
    label: 'Главная',
    icon: 'i-lucide-house',
    to: '/',
  },
  {
    label: 'Страница кондитерской',
    icon: 'i-lucide-map',
  },
])

const followers = ref({
  count: 12,
  top: [
    {
      src: 'https://avatar.k39.online/12454343.svg',
    },
    {
      src: 'https://avatar.k39.online/12452354543.svg',
    },
    {
      src: 'https://avatar.k39.online/124552235343.svg',
    },
  ],
})

useHead({
  title: params.pageSlug,
})
</script>
