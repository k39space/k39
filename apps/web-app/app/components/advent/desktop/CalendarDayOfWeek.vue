<template>
  <div
    class="p-2 text-amber-800 text-base/5 text-center font-serif border-r border-b border-amber-800/10 nth-[7n]:border-r-0"
    :class="[
      isWeekend && 'font-semibold',
    ]"
  >
    {{ day }}
  </div>
</template>

<script setup lang="ts">
const { dayNumber } = defineProps<{ dayNumber: number }>()

const day = computed(() => getDayName(dayNumber))
const isWeekend = computed(() => dayNumber === 6 || dayNumber === 7)

function getDayName(dayNumber: number) {
  return ['Пн', 'Вт', 'Ср', 'Чт', 'Пт', 'Сб', 'Вс'][dayNumber - 1]
}
</script>
