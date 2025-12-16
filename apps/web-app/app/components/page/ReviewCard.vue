<template>
  <div
    class="border border-default rounded-lg p-4 sm:p-5 flex flex-col gap-5 group/card"
    itemscope
    itemprop="review"
    itemtype="https://schema.org/Review"
  >
    <div class="grid grid-cols-1 md:grid-cols-3 gap-4 items-start">
      <NuxtLink
        :to="`/u/${review.user.username}`"
        class="col-span-2 w-fit group transition hover:scale-98 duration-200"
      >
        <UserProfileCard :user="review.user" />
      </NuxtLink>

      <div class="flex flex-col gap-2 md:items-end">
        <div class="flex flex-row gap-2 opacity-35 group-hover/card:opacity-100 transition duration-200">
          <UButton
            size="lg"
            color="neutral"
            variant="outline"
            icon="i-lucide-share-2"
            class="w-fit"
            @click="copyReviewUrlToClipboard()"
          />
          <UButton
            size="lg"
            color="neutral"
            variant="outline"
            icon="i-lucide-flag-triangle-right"
            class="w-fit"
          />
        </div>
      </div>
    </div>

    <div class="flex flex-col gap-4">
      <div class="flex flex-row flex-wrap gap-2 items-center">
        <UBadge
          size="lg"
          variant="soft"
          :color="review.recommends ? 'success' : 'error'"
          :icon="review.recommends ? 'i-lucide-thumbs-up' : 'i-lucide-thumbs-down'"
          :label="review.recommends ? 'Рекомендует' : 'Не рекомендует'"
          class="px-2.5"
        />

        <UBadge
          v-if="review.verified"
          size="lg"
          variant="soft"
          color="info"
          icon="i-lucide-badge-check"
          label="Подтвержденный отзыв"
          class="px-2.5"
        />
      </div>

      <div class="flex flex-row gap-2 items-center">
        <RatingStars :rating="review.rating" />
        <span
          itemscope
          itemprop="reviewRating"
          itemtype="https://schema.org/Rating"
        >
          <meta itemprop="bestRating" content="5">
          <meta itemprop="worstRating" content="1">
          <meta itemprop="ratingValue" :content="review.rating.toFixed(1)">
        </span>
        <p class="text-sm/4 text-muted">
          Оценка {{ review.rating }} из 5
        </p>
      </div>

      <PageReviewCardSection
        v-if="review.pros"
        title="Достоинства"
        :content="review.pros"
        itemprop="positiveNotes"
      />

      <PageReviewCardSection
        v-if="review.cons"
        title="Недостатки"
        :content="review.cons"
        itemprop="negativeNotes"
      />

      <meta
        v-if="review.comment"
        itemprop="headline"
        :content="review.comment.slice(0, 100)"
      >

      <PageReviewCardSection
        v-if="review.comment"
        title="Комментарий"
        :content="review.comment"
        itemprop="reviewBody"
      />

      <div>
        <time :datetime="new Date(review.createdAt).toISOString()" class="text-sm/5 text-muted italic">
          Опубликовано {{ format(review.createdAt, 'dd MMMM yyyy', { locale: ru }) }}
        </time>
        <meta itemprop="datePublished" :content="format(review.createdAt, 'yyyy-MM-dd')">
      </div>

      <div v-if="review.photos.length" class="flex flex-col gap-2">
        <h3 class="text-lg/5 font-bold">
          Фото
        </h3>

        <div class="grid grid-cols-3 lg:grid-cols-5 gap-2">
          <span
            itemscope
            itemprop="itemReviewed"
            itemtype="https://schema.org/LocalBusiness"
          >
            <meta itemprop="url" :content="`https://k39.online/${review.page.slug}`">

            <PageReviewCardPhoto
              v-for="photo in review.photos"
              :key="photo.id"
              :photo="photo.photo"
              :alt="`Пользовательское фото из отзыва к «${review.page.title}»`"
            />
          </span>
        </div>
      </div>
    </div>

    <div class="flex flex-row gap-2 justify-between items-center">
      <ULink
        to="#"
        size="lg"
        class="font-medium opacity-35 group-hover/card:opacity-100 transition duration-200"
      >
        Комментарии
      </ULink>

      <div class="opacity-35 group-hover/card:opacity-100 transition duration-200">
        <span
          itemscope
          itemprop="interactionStatistic"
          itemtype="https://schema.org/InteractionCounter"
        >
          <meta itemprop="interactionType" content="https://schema.org/LikeAction">
          <meta itemprop="userInteractionCount" :content="review.likesCount.toString()">
        </span>

        <span
          itemscope
          itemprop="interactionStatistic"
          itemtype="https://schema.org/InteractionCounter"
        >
          <meta itemprop="interactionType" content="https://schema.org/DislikeAction">
          <meta itemprop="userInteractionCount" :content="review.dislikesCount.toString()">
        </span>

        <PageReviewCardVotes
          :review-id="review.id"
          :vote-balance="review.voteBalance"
          :update-data="updateData"
        />
      </div>
    </div>
  </div>
</template>

<script setup lang="ts">
import type { PageReviewWithData } from '@k39/database'
import { format } from 'date-fns'
import { ru } from 'date-fns/locale'

const { review } = defineProps<{ review: PageReviewWithData, updateData: () => void }>()

function copyReviewUrlToClipboard() {
  navigator.clipboard.writeText(`${window.location.origin}/review/${review.id}`)
}
</script>
