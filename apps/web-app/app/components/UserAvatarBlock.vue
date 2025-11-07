<template>
  <div class="flex flex-row gap-4">
    <div class="relative flex flex-col items-center justify-center">
      <UserAvatarWithProgress :value="progress" :src="user?.avatarUrl" />

      <div v-if="user.level" class="absolute -bottom-2 left-0 right-0 flex flex-row justify-center items-center">
        <div class="w-8 h-5 bg-default ring-2 ring-default rounded-full flex flex-col items-center justify-center">
          <p class="font-semibold">
            {{ user.level }}
          </p>
        </div>
      </div>
    </div>

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
            @click="tryActionThatRequiresLogin()"
          />
        </template>
      </div>
    </div>
  </div>
</template>

<script setup lang="ts">
import type { User } from '@k39/database'

const { user } = defineProps<{ user: User }>()

const userStore = useUserStore()

const canEditProfile = computed(() => userStore.id === user.id)
const canFollow = computed(() => userStore.id !== user.id)

const progress = computed(() => getXpPercent(user.xp, user.xpToNextLevel))

function getXpPercent(xp: number, xpToNextLevel: number) {
  if (xpToNextLevel <= 0) {
    return 0
  }

  const percent = Math.floor((xp / xpToNextLevel) * 100)

  return Math.min(percent, 100)
}
</script>
