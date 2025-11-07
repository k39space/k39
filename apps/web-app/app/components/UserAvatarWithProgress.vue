<template>
  <div
    class="radial-progress-with-gradient size-32 inline-block rounded-full transition duration-200"
    :style="`--value: ${value};`"
  />
  <div class="absolute size-28 rounded-full">
    <img :src="src ?? ''" class="rounded-full">
  </div>
</template>

<script setup lang="ts">
const { value } = defineProps<{ value: number, src?: string | null }>()
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
