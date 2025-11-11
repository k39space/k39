<template>
  <div class="flex flex-col gap-1">
    <h3 class="text-lg/5 font-semibold">
      {{ title }}
    </h3>
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
