<template>
  <UContainer class="max-w-5xl">
    <div class="mt-4 min-h-5">
      <UBreadcrumb
        v-if="items?.length"
        :items="items"
        class="motion-preset-slide-up"
      />
    </div>

    <div class="my-4 lg:py-6 flex flex-col gap-4">
      <div class="flex flex-col lg:flex-row gap-2 justify-between items-start">
        <PageAvatarBlock v-if="page" :page="page" />

        <div class="flex flex-col gap-4">
          <div class="flex flex-row gap-6">
            <PageFollowers
              :avatars="followers.top"
              :count="followers.count"
            />

            <PageRating :rating="page?.rating ?? 0" :url="`/${page?.slug}/reviews`" />
          </div>

          <USkeleton v-if="!userStore.ready" class="w-full h-9" />
          <div v-else>
            <UButton
              v-if="canFollow"
              icon="i-lucide-user-plus"
              size="lg"
              color="neutral"
              variant="soft"
              block
              label="Подписаться"
              @click="userStore.loggedIn ? () => {} : tryActionThatRequiresAuth()"
            />
          </div>
        </div>
      </div>
    </div>
  </UContainer>

  <UContainer class="max-w-5xl">
    <div class="shrink-0 flex items-center justify-between border border-default rounded-lg px-4 sm:px-6 gap-1.5 overflow-x-auto min-h-[49px]">
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
import type { NavigationMenuItem } from '@nuxt/ui'

const { params } = useRoute('pageSlug___ru')

const { data: page, error } = await useFetch(`/api/page/slug/${params.pageSlug}`)

if (!page.value || error.value) {
  throw createError({
    statusCode: 404,
    message: 'Страница не найдена',
  })
}

const userStore = useUserStore()

const canFollow = computed(() => true)

const { items } = useBreadcrumb()

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
    badge: 8,
  },
  {
    label: 'Филиалы',
    to: `/${params.pageSlug}/points`,
    icon: 'i-lucide-map',
    badge: 2,
  },
])

const followers = ref({
  count: 9,
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
</script>
