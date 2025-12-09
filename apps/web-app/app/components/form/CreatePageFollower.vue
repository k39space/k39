<template>
  <UForm @submit="onSubmit">
    <UButton
      type="submit"
      size="lg"
      color="neutral"
      variant="solid"
      block
      icon="i-lucide-user-plus"
      label="Подписаться"
      :loading="isSubmitting"
      :disabled="isSubmitting"
    />
  </UForm>
</template>

<script setup lang="ts">
const { pageId } = defineProps<{ pageId: string }>()

const emit = defineEmits(['success', 'submitted'])

const isSubmitting = ref(false)

const toast = useToast()
const { pop } = useConfetti()

const userStore = useUserStore()

async function onSubmit() {
  if (isSubmitting.value) {
    return
  }

  isSubmitting.value = true

  emit('submitted')

  try {
    await $fetch(`/api/page/id/${pageId}/follower`, { method: 'POST' })

    await userStore.update()

    emit('success')
    pop()
  } catch (error) {
    if (isApiError(error)) {
      toast.add({
        title: 'Ошибка при создании подписки',
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
