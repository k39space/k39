<template>
  <div class="p-2 pb-4 flex flex-col gap-0 bg-amber-50 border border-b-6 border-amber-800/25 rounded-md motion-preset-slide-up">
    <div class="grid grid-cols-7 gap-0">
      <AdventDesktopCalendarDayOfWeek
        v-for="day in 7"
        :key="day"
        :day-number="day"
      />
    </div>
    <div class="grid grid-cols-7 gap-0">
      <AdventDesktopCalendarDayCell
        v-for="cell in adventStore.cells"
        :key="cell.dayNumber"
      >
        <AdventDesktopCalendarDay v-if="cell.day" :day="cell.day" />
      </AdventDesktopCalendarDayCell>
    </div>
  </div>
</template>

<script setup lang="ts">
const adventStore = useAdventStore()
</script>
