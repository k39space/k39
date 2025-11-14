<template>
  <div
    class="p-2 bg-amber-200 text-neutral-900 text-center font-semibold"
    :class="[
      isWeekend && 'bg-rose-400 text-white',
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
