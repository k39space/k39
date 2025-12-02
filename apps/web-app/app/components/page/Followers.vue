<template>
  <div class="flex flex-col gap-2 items-end">
    <div>
      <h4 class="text-right text-2xl/6 font-bold">
        {{ count }}
      </h4>
      <p class="text-sm text-muted">
        {{ pluralizationRu(count, ['Подписчик', 'Подписчика', 'Подписчиков']) }}
      </p>
    </div>

    <UAvatarGroup v-if="followers.length">
      <NuxtLink
        v-for="follower in followers"
        :key="follower.id"
        :to="`/u/${follower.user.username}`"
      >
        <UAvatar :src="follower.user.avatarUrl ?? undefined" />
      </NuxtLink>
    </UAvatarGroup>
    <UAvatarGroup v-else>
      <UAvatar
        v-for="i in 3"
        :key="i"
        :src="undefined"
      />
    </UAvatarGroup>
  </div>
</template>

<script lang="ts" setup>
import type { PageFollowerWithData } from '@k39/database'

defineProps<{ count: number, followers: PageFollowerWithData[] }>()
</script>
