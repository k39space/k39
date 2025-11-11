<template>
  <div class="flex flex-col gap-1">
    <p class="text-base/5 font-bold">
      {{ title }}
    </p>
    <p class="text-base/6 whitespace-pre-wrap text-muted">
      {{ content }}
    </p>
  </div>
</template>

<script setup lang="ts">
defineProps<{
  title: string
  content: string
}>()
</script>
