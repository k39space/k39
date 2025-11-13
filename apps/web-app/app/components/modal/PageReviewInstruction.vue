<template>
  <UModal
    title="Инструкция"
    :ui="{
      content: 'max-w-sm',
    }"
  >
    <template #body>
      <div class="px-8 flex flex-col gap-2 items-center">
        <p class="text-base/5 text-center">
          О чем писать
        </p>
      </div>

      <UButton
        variant="solid"
        color="primary"
        size="xl"
        block
        class="mt-5"
        label="Понятно"
        @click="onClick()"
      />
    </template>
  </UModal>
</template>

<script setup lang="ts">
defineProps<{ onClick: () => void }>()
</script>
