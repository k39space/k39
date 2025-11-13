<template>
  <UForm
    :schema="createPageReviewClientSchema"
    :state="state"
    class="flex flex-col gap-3"
    @submit="onSubmit"
  >
    <div class="flex flex-row gap-2 justify-between">
      <UFormField
        label="Общая оценка"
        name="rating"
        required
      >
        <USelect
          v-model="state.rating"
          :items="ratings"
        />
      </UFormField>

      <div>
        <UButton
          variant="soft"
          color="neutral"
          size="lg"
          icon="i-lucide-info"
          label="О чем писать?"
          @click="modalPageReviewInstruction.open({ onClick: modalPageReviewInstruction.close })"
        />
      </div>
    </div>

    <UFormField label="Достоинства" name="pros">
      <UTextarea
        v-model="state.pros"
        :rows="1"
        autoresize
        size="xl"
        class="w-full"
      />
    </UFormField>

    <UFormField label="Недостатки" name="cons">
      <UTextarea
        v-model="state.cons"
        :rows="1"
        autoresize
        size="xl"
        class="w-full"
      />
    </UFormField>

    <UFormField label="Комментарий" name="comment">
      <UTextarea
        v-model="state.comment"
        :rows="2"
        autoresize
        size="xl"
        class="w-full"
      />
    </UFormField>

    <UFormField
      label="Прикрепите фотографии"
      hint="Максимум 10"
      name="photos"
    >
      <UFileUpload
        v-model="state.photos"
        multiple
        layout="list"
        position="inside"
        accept="image/*"
        icon="i-lucide-image"
        label="Выберите или перетащите сюда"
        description="Формат - JPG, PNG, WEBP или HEIC/HEIF"
        color="neutral"
        class="w-full"
        :ui="{
          base: 'min-h-48 border border-dashed border-accented',
        }"
      />
    </UFormField>

    <UButton
      type="submit"
      variant="solid"
      color="primary"
      size="xl"
      block
      class="mt-3"
      label="Отправить"
      :loading="isSubmitting"
      :disabled="isSubmitting"
    />

    <div class="mx-auto max-w-sm text-sm/5 text-muted text-center">
      Нажимая кнопку "Отправить", Вы соглашаетесь c <ULink
        to="/legal/privacy-policy"
        target="_blank"
        class="text-info"
      >
        условиями Политики конфиденциальности
      </ULink>
    </div>
  </UForm>
</template>

<script setup lang="ts">
import type { FormSubmitEvent } from '@nuxt/ui'
import type { CreatePageReviewClientSchema } from '../../utils/review'
import { createPageReviewClientSchema } from '../../utils/review'
import PageReviewInstruction from '../modal/PageReviewInstruction.vue'

const { pageId, pageSlug } = defineProps<{ pageId: string, pageSlug: string }>()

const emit = defineEmits(['success', 'submitted'])

const isSubmitting = ref(false)

const { state } = usePageReview()

const toast = useToast()

const overlay = useOverlay()
const modalPageReviewInstruction = overlay.create(PageReviewInstruction)

const ratings = computed(() => Array.from({ length: 5 }, (_, i) => i + 1))

const userStore = useUserStore()

async function onSubmit(event: FormSubmitEvent<CreatePageReviewClientSchema>) {
  if (isSubmitting.value) {
    return
  }

  isSubmitting.value = true

  emit('submitted')

  try {
    const formData = new FormData()

    formData.append('rating', event.data.rating.toString())
    formData.append('pros', event.data.pros || '')
    formData.append('cons', event.data.cons || '')
    formData.append('comment', event.data.comment || '')

    if (event.data.photos && event.data.photos.length > 0) {
      event.data.photos.forEach((file) => {
        formData.append('photos', file, file.name)
      })
    }

    await $fetch(`/api/page/id/${pageId}/review`, {
      method: 'POST',
      body: formData,
    })

    await userStore.update()

    emit('success')

    await navigateTo(`/${pageSlug}/reviews`)
  } catch (error) {
    console.error(error)

    toast.add({
      title: 'Ошибка при отправке отзыва',
      description: error instanceof Error ? error.message : 'Пожалуйста, попробуйте еще раз.',
      color: 'error',
    })
  } finally {
    isSubmitting.value = false
  }
}
</script>
