<template>
  <div class="p-3 bg-amber-50 text-neutral-900 aspect-square">
    {{ day }}
  </div>
</template>

<script setup lang="ts">
defineProps<{ day: number }>()
</script>
