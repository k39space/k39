<template>
  <div class="flex flex-row gap-4">
    <UserAvatarWithProgress
      size="lg"
      :percent="progressPercent"
      :src="user.avatarUrl"
      :level="user.level"
    />

    <div class="flex flex-col gap-3.5 justify-center">
      <div class="flex flex-col gap-2">
        <h1 class="text-3xl/6 font-bold">
          {{ user?.name }}
        </h1>

        <div class="flex flex-row gap-2 items-center">
          <img src="/img/badge/badge1.gif" class="size-8 border border-accented rounded-sm">
          <p class="text-muted">
            Знаток области X уровня
          </p>
        </div>
      </div>

      <USkeleton v-if="!userStore.ready" class="w-32 h-9" />
      <div v-else>
        <UButton
          v-if="canEditProfile"
          icon="i-lucide-edit"
          size="lg"
          color="neutral"
          variant="soft"
          class="w-fit"
          label="Редактировать профиль"
        />

        <template v-if="canFollow">
          <UButton
            v-if="userStore.loggedIn"
            icon="i-lucide-user-plus"
            size="lg"
            color="neutral"
            variant="soft"
            class="w-fit"
            label="Подписаться"
          />
          <UButton
            v-else
            icon="i-lucide-user-plus"
            size="lg"
            color="neutral"
            variant="soft"
            class="w-fit"
            label="Подписаться"
            @click="tryActionThatRequiresAuth()"
          />
        </template>
      </div>
    </div>
  </div>
</template>

<script setup lang="ts">
import type { User } from '@k39/database'
import { getUserXpPercent } from '#shared/utils/user'

const { user } = defineProps<{ user: User }>()

const userStore = useUserStore()

const canEditProfile = computed(() => userStore.id === user.id)
const canFollow = computed(() => userStore.id !== user.id)

const progressPercent = computed(() => getUserXpPercent(user.xp, user.xpToNextLevel))
</script>
