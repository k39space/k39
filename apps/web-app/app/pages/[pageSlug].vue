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

    <div class="my-4 lg:py-6 flex flex-col gap-4">
      <div class="flex flex-col lg:flex-row gap-2 justify-between items-start">
        <PageAvatarBlock v-if="page" :page="page" />

        <div class="flex flex-col gap-4">
          <div class="flex flex-row gap-6">
            <PageFollowers
              :followers="topFollowers"
              :count="page?.followersCount ?? 0"
            />

            <PageRating :rating="page?.overallRating ?? 0" :url="`/${page?.slug}/reviews`" />
          </div>

          <USkeleton v-if="!userStore.ready" class="w-full h-9" />
          <div v-else-if="page?.id">
            <FormDeletePageFollower
              v-if="userStore.loggedIn && isFollower"
              :page-id="page.id"
              @success="() => { fetchPage(); fetchFollower() }"
            />
            <FormCreatePageFollower
              v-else-if="userStore.loggedIn && !isFollower"
              :page-id="page.id"
              @success="() => { fetchPage(); fetchFollower() }"
            />
            <UButton
              v-else
              size="lg"
              color="neutral"
              variant="solid"
              block
              icon="i-lucide-user-plus"
              label="Подписаться"
              @click="tryActionThatRequiresAuth()"
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
import type { PageFollowerWithData } from '@k39/database'
import type { NavigationMenuItem } from '@nuxt/ui'

const { params } = useRoute('pageSlug___ru')

const { data: page, error, execute: fetchPage } = await useFetch(`/api/page/slug/${params.pageSlug}`)

if (!page.value || error.value) {
  throw createError({
    statusCode: 404,
    message: 'Страница не найдена',
  })
}

const { data: follower, execute: fetchFollower } = await useFetch(`/api/page/id/${page.value?.id}/my`)

const userStore = useUserStore()

const isFollower = computed<boolean>(() => userStore.id === follower.value?.userId)

const topFollowers = computed<PageFollowerWithData[]>(() => page.value?.followers.slice(0, 3) || [])

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
    badge: page.value?.reviewsCount ? page.value.reviewsCount : undefined, // show if more than 0
  },
  {
    label: 'Адреса',
    to: `/${params.pageSlug}/points`,
    icon: 'i-lucide-map',
  },
])
</script>
