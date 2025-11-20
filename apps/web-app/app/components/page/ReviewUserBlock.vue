<template>
  <div v-if="!review" class="flex flex-col gap-2">
    <h4 class="text-xl/5 font-bold">
      Поделитесь впечатлениями
    </h4>

    <p class="text-base/5 text-muted">
      Расскажите, что вам запомнилось — вашим отзывом вы согреете наше сердце
    </p>

    <UButton
      icon="i-lucide-edit"
      size="xl"
      color="primary"
      variant="solid"
      block
      class="mt-2.5 motion-preset-slide-up"
      label="Написать отзыв"
      @click="userStore.loggedIn ? navigateTo(`/review/new/${pageSlug}`) : tryActionThatRequiresAuth()"
    />
  </div>

  <div v-else class="flex flex-col gap-2">
    <h4 class="text-xl/5 font-bold">
      Вы уже оставили отзыв
    </h4>

    <p class="text-base/5 text-muted">
      Спасибо за ваше мнение!
    </p>
  </div>
</template>

<script setup lang="ts">
import type { PageReview } from '@k39/database'

defineProps<{ review: PageReview | undefined | null, pageSlug: string }>()

const userStore = useUserStore()
</script>
