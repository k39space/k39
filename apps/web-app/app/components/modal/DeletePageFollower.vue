<template>
  <UModal
    title="Требуется подтверждение"
    :ui="{
      content: 'max-w-sm',
    }"
  >
    <template #body>
      <div class="px-8 flex flex-col gap-2 items-center">
        <UIcon name="fluent-emoji-flat:raised-hand-light" class="size-18 mx-auto" />

        <p class="text-base/5 text-center">
          Вы действительно хотите отписаться от страницы?
        </p>
      </div>

      <div class="mt-5 flex flex-col gap-2">
        <FormDeletePageFollower :page-id="pageId" @success="onSuccess" />

        <UButton
          variant="soft"
          color="neutral"
          size="xl"
          block
          label="Отмена"
          @click="onClose"
        />
      </div>
    </template>
  </UModal>
</template>

<script setup lang="ts">
defineProps<{ pageId: string, onSuccess: () => void, onClose: () => void }>()
</script>
