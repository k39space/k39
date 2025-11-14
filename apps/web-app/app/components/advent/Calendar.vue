<template>
  <div class="flex flex-col gap-2">
    <div class="grid grid-cols-7 gap-2">
      <AdventCalendarDayOfWeek
        v-for="day in 7"
        :key="day"
        :day-number="day"
      />
    </div>
    <div class="grid grid-cols-7 gap-2">
      <AdventCalendarDay
        v-for="day in days"
        :key="day.day"
        :day="day.day"
      />
    </div>
  </div>
</template>

<script setup lang="ts">
const days = ref([
  {
    day: 1,
  },
  {
    day: 2,
  },
  {
    day: 3,
  },
  {
    day: 4,
  },
  {
    day: 5,
  },
  {
    day: 6,
  },
  {
    day: 7,
  },
  {
    day: 8,
  },
  {
    day: 9,
  },
  {
    day: 10,
  },
  {
    day: 11,
  },
  {
    day: 12,
  },
  {
    day: 13,
  },
  {
    day: 14,
  },
  {
    day: 15,
  },
  {
    day: 16,
  },
  {
    day: 17,
  },
  {
    day: 18,
  },
  {
    day: 19,
  },
  {
    day: 20,
  },
  {
    day: 21,
  },
  {
    day: 22,
  },
  {
    day: 23,
  },
  {
    day: 24,
  },
  {
    day: 25,
  },
  {
    day: 26,
  },
  {
    day: 27,
  },
  {
    day: 28,
  },
  {
    day: 29,
  },
  {
    day: 30,
  },
  {
    day: 31,
  },
])
</script>
