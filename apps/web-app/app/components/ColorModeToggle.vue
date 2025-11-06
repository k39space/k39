<template>
  <UTooltip :text="ariaLabel">
    <div>
      <UColorModeButton size="xl" />
    </div>
  </UTooltip>
</template>

<script setup lang="ts">
const colorMode = useColorMode()
const { t } = useI18n()

const isDark = computed(() => colorMode.value === 'dark')
const ariaLabel = computed(() => isDark.value ? t('app.colorMode.switch.light') : t('app.colorMode.switch.dark'))
</script>
