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
      <picture>
        <source
          v-if="webpSrc"
          :srcset="webpSrc"
          type="image/webp"
        >
        <img
          :src="jpegSrc"
          :alt="alt ?? ''"
          class="w-full h-full object-cover rounded-lg"
        >
      </picture>
    </template>
  </UModal>
</template>

<script setup lang="ts">
defineProps<{ jpegSrc: string, webpSrc?: string, alt?: string }>()
</script>
