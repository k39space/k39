<template>
  <div class="relative" :class="getSizes().progress">
    <div
      class="radial-progress-with-gradient inline-block rounded-full transition duration-200"
      :class="getSizes().progress"
      :style="`--value: ${percent}; --thickness: ${getSizes().thickness};`"
    />
    <div class="absolute inset-0 m-auto" :class="getSizes().img">
      <img :src="src ?? ''" class="rounded-full">
    </div>

    <div v-if="level" class="absolute -bottom-2 left-0 right-0 flex flex-row justify-center items-center">
      <div
        class="w-8 h-5 bg-default ring-2 ring-default rounded-full flex flex-col items-center justify-center"
        :class="getSizes().scale"
      >
        <p class="font-semibold">
          {{ level }}
        </p>
      </div>
    </div>
  </div>
</template>

<script setup lang="ts">
const { percent, size = 'md' } = defineProps<{ percent: number, level?: number, src?: string | null, size?: 'sm' | 'md' | 'lg' }>()

function getSizes() {
  switch (size) {
    case 'sm': {
      return {
        progress: 'size-16',
        img: 'size-13',
        thickness: '0.2rem',
        scale: 'scale-70',
      }
    }
    case 'md':
      return {
        progress: 'size-24',
        img: 'size-20',
        thickness: '0.3rem',
        scale: 'scale-90',
      }
    case 'lg':
      return {
        progress: 'size-32',
        img: 'size-28',
        thickness: '0.3rem',
        scale: 'scale-100',
      }
  }
}
</script>

<style scoped>
.radial-progress-with-gradient {
  --color-start: var(--ui-color-info-400);
  --color-end: var(--ui-color-success-500);
  --value: 50;
  --thickness: 0.3rem;

  background: conic-gradient(
    from 0deg,
    var(--color-start) 0%,
    var(--color-end) calc(var(--value) * 1%),
    var(--ui-bg-elevated) calc(var(--value) * 1%)
  );
  mask: radial-gradient(
    farthest-side,
    transparent calc(100% - var(--thickness)),
    white calc(100% - var(--thickness) + 1px)
  );
  -webkit-mask: radial-gradient(
    farthest-side,
    transparent calc(100% - var(--thickness)),
    white calc(100% - var(--thickness) + 1px)
  );
}
</style>
