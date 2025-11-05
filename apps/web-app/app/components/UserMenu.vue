<template>
  <UDropdownMenu
    :items="userMenuItems"
    :ui="{
      content: 'w-56',
    }"
  >
    <UAvatar
      :src="user?.avatarUrl ?? undefined"
      :alt="user?.name"
      size="lg"
      class="cursor-pointer hover:scale-95 duration-200"
    />
  </UDropdownMenu>
</template>

<script setup lang="ts">
import type { DropdownMenuItem } from '@nuxt/ui'

const { user, clear: signOut } = useUserSession()

const userMenuItems = computed<DropdownMenuItem[][]>(() => [
  [
    {
      label: user.value?.name,
      avatar: {
        src: user.value?.avatarUrl ?? undefined,
      },
      type: 'label' as const,
    },
    {
      label: 'Моя страница',
      icon: 'i-lucide-user',
      to: '/u/me',
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
