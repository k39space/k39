<template>
  <UModal
    :ui="{
      content: 'max-w-4xl',
      header: 'border-0! py-0! my-0! min-h-14!',
      close: 'p-1!',
      body: 'px-4! pb-4! pt-0! h-auto! w-full!',
    }"
  >
    <template #body>
      <img
        :src="src"
        :alt="alt ?? ''"
        class="w-full h-full object-cover rounded-lg"
      >
    </template>
  </UModal>
</template>

<script setup lang="ts">
defineProps<{ src: string, alt?: string }>()
</script>
