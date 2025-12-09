<template>
  <UModal
    title="Валидация отзыва"
    :ui="{
      content: 'max-w-md',
    }"
  >
    <template #body>
      <div class="flex flex-col gap-6">
        <UIcon name="fluent-emoji-flat:check-mark-button" class="size-18 mx-auto" />

        <p>
          Ваш отзыв может получить статус "Подтвержденный отзыв". Для этого загрузите в блок "Фотографии для валидации" фотографии с доказательствами. Это может быть чек, электронная квитанция, любой документ указывающий на транзакцию.
        </p>

        <p class="text-muted">
          Все что вы загружаете и пишете в "Приватной территории" не будет видно пользователям. Доступ к этому контенту есть только у модерации площадки, владельца страницы и его администраторов.
        </p>
      </div>

      <UButton
        variant="solid"
        color="primary"
        size="xl"
        block
        class="mt-5"
        label="Хорошо"
        @click="onClick()"
      />
    </template>
  </UModal>
</template>

<script setup lang="ts">
defineProps<{ onClick: () => void }>()
</script>
