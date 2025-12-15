<template>
  <UForm @submit="userStore.loggedIn ? onSubmit() : tryActionThatRequiresAuth()">
    <UTooltip :text="text">
      <UButton
        type="submit"
        size="lg"
        color="neutral"
        variant="outline"
        :icon="icon"
        :disabled="isSubmitting"
        :loading="isSubmitting"
      />
    </UTooltip>
  </UForm>
</template>

<script setup lang="ts">
import type { PageReviewVoteType } from '@k39/database'

const { reviewId, type } = defineProps<{ reviewId: string, type: PageReviewVoteType }>()

const emit = defineEmits(['success', 'submitted'])

const isSubmitting = ref(false)

const text = computed(() => {
  return type === 'like'
    ? 'Нравится отзыв. Проголосовать за!'
    : 'Не нравится отзыв. Проголосовать против :('
})
const icon = computed(() => {
  return type === 'like'
    ? 'i-lucide-thumbs-up'
    : 'i-lucide-thumbs-down'
})

const toast = useToast()

const userStore = useUserStore()

async function onSubmit() {
  if (isSubmitting.value) {
    return
  }

  isSubmitting.value = true

  emit('submitted')

  try {
    await $fetch(`/api/page/review/id/${reviewId}/vote`, {
      method: 'POST',
      body: {
        type,
      },
    })

    await userStore.update()

    emit('success')

    toast.add({
      title: 'Спасибо за ваш голос!',
      color: 'success',
      icon: 'i-lucide-thumbs-up',
      duration: 2000,
    })
  } catch (error) {
    if (isApiError(error)) {
      toast.add({
        title: 'Ошибка при голосовании',
        description: error.data.data.message ?? 'Пожалуйста, попробуйте еще раз.',
        color: 'error',
        icon: 'i-lucide-triangle-alert',
      })
    }
  } finally {
    isSubmitting.value = false
  }
}
</script>
