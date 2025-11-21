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
        <RatingStarsSelector v-model="state.rating" />
      </UFormField>

      <div>
        <UButton
          variant="soft"
          color="neutral"
          size="md"
          icon="i-lucide-info"
          label="О чем писать?"
          @click="modalPageReviewInstruction.open({ onClick: modalPageReviewInstruction.close })"
        />
      </div>
    </div>

    <UFormField
      label="Рекомендуете ли другим?"
      name="recommends"
      required
    >
      <UTabs
        v-model="selectedRecommends"
        :items="recommendsItems"
        :content="false"
        :color="selectedRecommends === 'yes' ? 'success' : 'error'"
        size="md"
        class="w-40"
      />
    </UFormField>

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

    <USeparator icon="fluent-emoji-flat:old-key" class="mt-8" />

    <div class="mb-2 flex flex-row gap-2 justify-between items-center">
      <h3 class="text-xl/6 font-bold text-center text-warning">
        Приватная территория
      </h3>

      <div>
        <UButton
          variant="soft"
          color="warning"
          size="md"
          icon="i-lucide-info"
          label="Подробности"
          @click="modalPageReviewPrivateInstruction.open({ onClick: modalPageReviewPrivateInstruction.close })"
        />
      </div>
    </div>

    <UFormField
      label="Скрытый комментарий"
      hint="Для владельца и администратора"
      name="privateComment"
    >
      <UTextarea
        v-model="state.privateComment"
        :rows="2"
        autoresize
        size="xl"
        class="w-full"
      />
    </UFormField>

    <UFormField
      label="Фотографии для валидации"
      hint="Максимум 5"
      name="privatePhotos"
    >
      <UFileUpload
        v-model="state.privatePhotos"
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
          base: 'border border-dashed border-accented',
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
import type { CreatePageReviewClientSchema } from '@k39/types/client'
import type { FormSubmitEvent } from '@nuxt/ui'
import { createPageReviewClientSchema } from '@k39/types/client'
import PageReviewInstruction from '../modal/PageReviewInstruction.vue'
import PageReviewPrivateInstruction from '../modal/PageReviewPrivateInstruction.vue'

const { pageId, pageSlug } = defineProps<{ pageId: string, pageSlug: string }>()

const emit = defineEmits(['success', 'submitted'])

const isSubmitting = ref(false)

const { state } = usePageReview()

const recommendsItems = [{
  label: 'Да',
  value: 'yes',
}, {
  label: 'Нет',
  value: 'no',
}]
const selectedRecommends = ref<'yes' | 'no'>()

watch(selectedRecommends, (value) => {
  state.value.recommends = value
})

const toast = useToast()

const overlay = useOverlay()
const modalPageReviewInstruction = overlay.create(PageReviewInstruction)
const modalPageReviewPrivateInstruction = overlay.create(PageReviewPrivateInstruction)

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
    formData.append('recommends', event.data.recommends.toString())
    formData.append('privateComment', event.data.privateComment || '')

    if (event.data.photos && event.data.photos.length > 0) {
      event.data.photos.forEach((file) => {
        formData.append('photos', file, file.name)
      })
    }

    if (event.data.privatePhotos && event.data.privatePhotos.length > 0) {
      event.data.privatePhotos.forEach((file) => {
        formData.append('privatePhotos', file, file.name)
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
    if (isApiError(error)) {
      toast.add({
        title: 'Ошибка при отправке отзыва',
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
