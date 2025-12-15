<template>
  <div class="flex flex-row gap-2.5 items-center">
    <FormCreatePageReviewVote
      :review-id="reviewId"
      type="dislike"
      @success="updateData()"
    />

    <p class="text-lg font-medium">
      {{ voteBalance > 0 ? '+' : '' }}{{ voteBalance }}
    </p>

    <FormCreatePageReviewVote
      :review-id="reviewId"
      type="like"
      @success="updateData()"
    />
  </div>
</template>

<script setup lang="ts">
defineProps<{ reviewId: string, voteBalance: number, updateData: () => void }>()
</script>
