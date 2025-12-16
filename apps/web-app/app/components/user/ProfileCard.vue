<template>
  <div
    class="flex flex-row gap-2.5"
    itemscope
    itemprop="author"
    itemtype="https://schema.org/Person"
  >
    <UserAvatarWithProgress
      size="sm"
      :percent="progressPercent"
      :src="user.avatarUrl"
      :level="user.level"
      class="group-hover:scale-104 transition duration-200"
    />

    <div class="mt-1 flex flex-col gap-1 items-start justify-center">
      <meta itemprop="image" :content="user.avatarUrl ?? undefined">
      <meta itemprop="url" :content="`https://k39.online/u/${user.username}`">

      <h3
        class="text-lg/5 font-bold"
        itemprop="name"
      >
        {{ user?.name }}
      </h3>

      <div class="flex flex-row gap-1.5 items-center">
        <img src="/img/badge/badge1.gif" class="size-7 border border-accented rounded-sm">
        <p class="text-sm/3 text-muted">
          Знаток области X уровня
        </p>
      </div>
    </div>
  </div>
</template>

<script setup lang="ts">
import type { User } from '@k39/database'
import { getUserXpPercent } from '#shared/utils/user'

const { user } = defineProps<{ user: User }>()

const progressPercent = computed(() => getUserXpPercent(user.xp, user.xpToNextLevel))
</script>
