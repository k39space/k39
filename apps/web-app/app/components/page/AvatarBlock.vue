<template>
  <div class="flex flex-row gap-4">
    <div class="relative flex flex-col items-center justify-center">
      <img src="/img/page-avatar/muza-avatar.jpg" class="size-32 rounded-lg border-2 border-default">
    </div>

    <div class="flex flex-col gap-3.5 justify-center">
      <div class="flex flex-col gap-2">
        <h1 class="text-3xl/6 font-bold">
          {{ page?.title }}
        </h1>

        <p class="text-base/4 text-muted">
          Кондитерская, кофейня, пекарня
        </p>

        <!-- <div class="flex flex-row gap-2 items-center">
          <img src="/img/badge/badge1.gif" class="size-8 border border-accented rounded-sm">
          <p class="text-muted">
            Знаток области X уровня
          </p>
        </div> -->
      </div>

      <USkeleton v-if="!userStore.ready" class="w-32 h-9" />
      <div v-else>
        <UButton
          v-if="canEdit"
          icon="i-lucide-edit"
          size="lg"
          color="neutral"
          variant="soft"
          class="w-fit"
          label="Редактировать"
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
import type { Page } from '@k39/database'

defineProps<{ page: Page }>()

const userStore = useUserStore()

const canEdit = computed(() => false)
const canFollow = computed(() => true)
</script>
