<template>
  <div class="p-2 pb-4 flex flex-col gap-0 bg-amber-50 border border-b-6 border-amber-800/25 rounded-md">
    <div class="grid grid-cols-7 gap-0">
      <AdventDesktopCalendarDayOfWeek
        v-for="day in 7"
        :key="day"
        :day-number="day"
      />
    </div>
    <div class="grid grid-cols-7 gap-0">
      <AdventDesktopCalendarDay
        v-for="day in days"
        :key="day.dayNumber"
        :day="day"
      />
    </div>
  </div>
</template>

<script setup lang="ts">
const days = ref<AdventDay[]>([
  {
    dayNumber: 1,
    isDayOver: false,
    isOpened: false,
    canOpen: false,
    isCompleted: false,
  },
  {
    dayNumber: 2,
    isDayOver: false,
    isOpened: false,
    canOpen: false,
    isCompleted: false,
  },
  {
    dayNumber: 3,
    isDayOver: false,
    isOpened: false,
    canOpen: false,
    isCompleted: false,
  },
  {
    dayNumber: 4,
    isDayOver: false,
    isOpened: false,
    canOpen: false,
    isCompleted: false,
  },
  {
    dayNumber: 5,
    isDayOver: false,
    isOpened: false,
    canOpen: false,
    isCompleted: false,
  },
  {
    dayNumber: 6,
    isDayOver: false,
    isOpened: false,
    canOpen: false,
    isCompleted: false,
  },
  {
    dayNumber: 7,
    isDayOver: false,
    isOpened: false,
    canOpen: false,
    isCompleted: false,
  },
  {
    dayNumber: 8,
    isDayOver: false,
    isOpened: false,
    canOpen: false,
    isCompleted: false,
  },
  {
    dayNumber: 9,
    isDayOver: false,
    isOpened: false,
    canOpen: false,
    isCompleted: false,
  },
  {
    dayNumber: 10,
    isDayOver: false,
    isOpened: false,
    canOpen: false,
    isCompleted: false,
  },
  {
    dayNumber: 11,
    isDayOver: false,
    isOpened: false,
    canOpen: false,
    isCompleted: false,
  },
  {
    dayNumber: 12,
    isDayOver: false,
    isOpened: false,
    canOpen: false,
    isCompleted: false,
  },
  {
    dayNumber: 13,
    isDayOver: false,
    isOpened: false,
    canOpen: false,
    isCompleted: false,
  },
  {
    dayNumber: 14,
    isDayOver: false,
    isOpened: false,
    canOpen: false,
    isCompleted: false,
  },
  {
    dayNumber: 15,
    isDayOver: false,
    isOpened: false,
    canOpen: false,
    isCompleted: false,
  },
  {
    dayNumber: 16,
    isDayOver: false,
    isOpened: false,
    canOpen: false,
    isCompleted: false,
  },
  {
    dayNumber: 17,
    isDayOver: false,
    isOpened: false,
    canOpen: false,
    isCompleted: false,
  },
  {
    dayNumber: 18,
    isDayOver: false,
    isOpened: false,
    canOpen: false,
    isCompleted: false,
  },
  {
    dayNumber: 19,
    isDayOver: false,
    isOpened: false,
    canOpen: false,
    isCompleted: false,
  },
  {
    dayNumber: 20,
    isDayOver: false,
    isOpened: false,
    canOpen: false,
    isCompleted: false,
  },
  {
    dayNumber: 21,
    isDayOver: false,
    isOpened: false,
    canOpen: false,
    isCompleted: false,
  },
  {
    dayNumber: 22,
    isDayOver: false,
    isOpened: false,
    canOpen: false,
    isCompleted: false,
  },
  {
    dayNumber: 23,
    isDayOver: false,
    isOpened: false,
    canOpen: false,
    isCompleted: false,
  },
  {
    dayNumber: 24,
    isDayOver: false,
    isOpened: false,
    canOpen: false,
    isCompleted: false,
  },
  {
    dayNumber: 25,
    isDayOver: false,
    isOpened: false,
    canOpen: false,
    isCompleted: false,
  },
  {
    dayNumber: 26,
    isDayOver: false,
    isOpened: false,
    canOpen: false,
    isCompleted: false,
  },
  {
    dayNumber: 27,
    isDayOver: false,
    isOpened: false,
    canOpen: false,
    isCompleted: false,
  },
  {
    dayNumber: 28,
    isDayOver: false,
    isOpened: false,
    canOpen: false,
    isCompleted: false,
  },
  {
    dayNumber: 29,
    isDayOver: false,
    isOpened: false,
    canOpen: false,
    isCompleted: false,
  },
  {
    dayNumber: 30,
    isDayOver: false,
    isOpened: false,
    canOpen: false,
    isCompleted: false,
  },
  {
    dayNumber: 31,
    isDayOver: false,
    isOpened: false,
    canOpen: false,
    isCompleted: false,
  },
])
</script>
