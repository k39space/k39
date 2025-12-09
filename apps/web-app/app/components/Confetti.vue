<template>
  <ClientOnly>
    <div
      v-if="isShown"
      v-confetti="{ particleCount: 240, duration: 5000, stageHeight: 4000, stageWidth: width, force: 0.2 }"
      class="z-10 mx-auto h-full w-dvw fixed inset-0 overflow-y-hidden overscroll-y-none"
    />
  </ClientOnly>
</template>

<script setup lang="ts">
import { vConfetti } from '@neoconfetti/vue'

const { isShown } = useConfetti()
const { width } = useWindowSize()
</script>
