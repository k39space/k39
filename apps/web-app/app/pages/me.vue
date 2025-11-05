<template>
  ...
</template>

<script setup lang="ts">
definePageMeta({
  layout: 'empty',
  middleware: ['01-auth-only'],
})
</script>
