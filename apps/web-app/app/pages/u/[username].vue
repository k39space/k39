<template>
  <UContainer class="max-w-4xl">
    <div class="my-4 lg:py-6 flex flex-col gap-4">
      <div class="flex flex-col lg:flex-row gap-2 justify-between items-center">
        <UserAvatarBlock v-if="user" :user="user" />

        <div class="flex flex-row gap-6">
          <UserFollowers
            :count="12"
            label="Подписчиков"
            :avatars="user?.followers.top ?? []"
          />
          <UserFollowers
            :count="5"
            label="Подписок"
            :avatars="user?.following.top ?? []"
          />
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

  <UContainer class="mt-6 max-w-4xl">
    <div class="mt-2 flex flex-row gap-6">
      <Badge
        v-for="badge in badgeStore.badges"
        :key="badge.id"
        :badge="badge"
      />
    </div>
  </UContainer>
</template>

<script setup lang="ts">
import type { NavigationMenuItem } from '@nuxt/ui'

const { params } = useRoute('u-username___ru')

const { data: user } = await useFetch(`/api/user/username/${params.username}`)

if (!user.value) {
  await navigateTo('/')
}

const badgeStore = useBadgeStore()

const submenuItems = computed<NavigationMenuItem[]>(() => [
  {
    label: 'Лента постов',
    to: `/u/${user.value?.username}`,
    icon: 'i-lucide-newspaper',
    exact: true,
  },
  {
    label: 'Отзывы',
    to: `/u/${user.value?.username}/reviews`,
    icon: 'i-lucide-user-star',
  },
  {
    label: 'Достижения',
    to: `/u/${user.value?.username}/badges`,
    icon: 'i-lucide-award',
    badge: 5,
  },
])

useHead({
  title: `${user.value?.name} @${params.username}`,
})
</script>
