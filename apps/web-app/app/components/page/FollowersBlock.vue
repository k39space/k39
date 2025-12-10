<template>
  <div class="w-full md:w-fit flex flex-col gap-4">
    <div class="flex flex-row gap-6 justify-end md:justify-start">
      <PageFollowers
        :followers="topFollowers"
        :count="page?.followersCount ?? 0"
      />

      <PageRating :rating="page?.overallRating ?? 0" :url="`/${page?.slug}/reviews`" />
    </div>

    <USkeleton v-if="!userStore.ready" class="w-full h-9" />
    <div v-else-if="page?.id">
      <PageUnfollowButton
        v-if="userStore.loggedIn && isFollower"
        :page-id="page.id"
        :on-success="updateData"
      />
      <FormCreatePageFollower
        v-else-if="userStore.loggedIn && !isFollower"
        :page-id="page.id"
        @success="updateData()"
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
</template>

<script setup lang="ts">
import type { PageFollowerWithData, PageWithData } from '@k39/database'

const { page, follower } = defineProps<{ updateData: () => void, page: PageWithData, follower?: PageFollowerWithData | null }>()

const userStore = useUserStore()

const isFollower = computed<boolean>(() => userStore.id === follower?.userId)

const topFollowers = computed<PageFollowerWithData[]>(() => page.followers.slice(0, 3) || [])
</script>
