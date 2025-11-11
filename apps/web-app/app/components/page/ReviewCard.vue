<template>
  <div class="border border-default rounded-lg p-4 sm:p-5 flex flex-col gap-5">
    <div class="grid grid-cols-3 gap-4">
      <NuxtLink :to="`/u/${review.user.username}`" class="col-span-2 w-fit transition hover:scale-98 duration-200">
        <UserProfileCard :user="review.user" />
      </NuxtLink>

      <div class="flex flex-col gap-2 items-end">
        <div class="flex flex-row gap-2">
          <UButton
            size="lg"
            color="neutral"
            variant="outline"
            icon="i-lucide-share-2"
            class="w-fit"
          />
          <UButton
            size="lg"
            color="neutral"
            variant="outline"
            icon="i-lucide-flag-triangle-right"
            class="w-fit"
          />
        </div>

        <time :datetime="review.createdAt" class="text-sm/5 text-muted">
          {{ format(review.createdAt, 'dd MMMM yyyy', { locale: ru }) }}
        </time>
      </div>
    </div>

    <div class="flex flex-col gap-3.5">
      <div class="flex flex-row gap-2 items-center">
        <RatingStars :rating="review.rating" />
        <p class="text-sm/4 text-muted">
          Оценка {{ review.rating }} из 5
        </p>
      </div>

      <PageReviewCardSection
        v-if="review.pros"
        title="Достоинства"
        :content="review.pros"
      />

      <PageReviewCardSection
        v-if="review.cons"
        title="Недостатки"
        :content="review.cons"
      />

      <PageReviewCardSection
        v-if="review.comment"
        title="Комментарий"
        :content="review.comment"
      />
    </div>

    <div class="flex flex-row gap-2 justify-between items-center">
      <ULink
        to="#"
        size="lg"
        class="font-medium"
      >
        Комментарии (2)
      </ULink>

      <div class="flex flex-row gap-2.5 items-center">
        <UButton
          size="xl"
          color="neutral"
          variant="link"
          icon="i-lucide-thumbs-down"
        />
        <p class="text-lg">
          {{ review.voteBalance > 0 ? '+' : '' }}{{ review.voteBalance }}
        </p>
        <UButton
          size="xl"
          color="neutral"
          variant="link"
          icon="i-lucide-thumbs-up"
        />
      </div>
    </div>
  </div>
</template>

<script setup lang="ts">
import type { PageReviewWithUser } from '@k39/database'
import { format } from 'date-fns'
import { ru } from 'date-fns/locale'

defineProps<{ review: PageReviewWithUser }>()
</script>
