<template>
  <div class="pl-2.5 pr-3.5 pt-2 pb-3 w-full flex flex-row gap-2.5 border border-default rounded-lg">
    <UserAvatarWithProgress
      size="sm"
      :percent="progressPercent"
      :src="user.avatarUrl"
      :level="user.level"
    />

    <div class="mt-1 flex flex-col gap-1 items-start justify-center">
      <p class="text-lg/5 font-semibold">
        {{ user?.name }}
      </p>

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
