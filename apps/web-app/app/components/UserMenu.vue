<template>
  <USkeleton v-if="!userStore.id" class="size-9 rounded-full" />
  <UDropdownMenu
    v-else
    :items="userMenuItems"
    :ui="{
      content: 'w-56',
    }"
  >
    <div class="relative">
      <UTooltip text="Открыть меню">
        <UAvatar
          :src="userStore.avatarUrl"
          :alt="`Аватар ${userStore.username}`"
          size="lg"
          class="cursor-pointer hover:scale-95 duration-200"
        />
      </UTooltip>
    </div>
  </UDropdownMenu>
</template>

<script setup lang="ts">
import type { DropdownMenuItem } from '@nuxt/ui'

const { clear: signOut } = useUserSession()
const userStore = useUserStore()

const userMenuItems = computed<DropdownMenuItem[][]>(() => [
  [
    {
      label: userStore.username,
      avatar: {
        src: userStore.avatarUrl,
      },
      type: 'label' as const,
    },
    {
      label: 'Моя страница',
      icon: 'i-lucide-user',
      to: `/u/${userStore.username}`,
      type: 'link' as const,
    },
  ],
  [
    {
      label: 'Выйти',
      icon: 'i-lucide-log-out',
      onSelect: async () => {
        await signOut()
        await navigateTo('/')
      },
    },
  ],
])
</script>
