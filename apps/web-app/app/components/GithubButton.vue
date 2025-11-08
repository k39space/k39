<template>
  <UTooltip text="GitHub">
    <UButton
      :to="app.githubUrl"
      target="_blank"
      leading-icon="i-simple-icons:github"
      aria-label="GitHub"
      variant="ghost"
      color="neutral"
      size="xl"
    />
  </UTooltip>
</template>

<script setup lang="ts">
const { app } = useAppConfig()
</script>
