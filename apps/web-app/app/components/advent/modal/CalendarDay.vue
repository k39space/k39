<template>
  <UModal
    :title="`День ${day.dayNumber}`"
    :ui="{
      content: 'max-w-sm',
    }"
    :overlay="true"
  >
    <template #body>
      <div class="px-8 flex flex-col gap-2 items-center">
        <p class="text-base/5 text-center">
          ???
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
defineProps<{ day: AdventDay, onClick: () => void }>()
</script>
