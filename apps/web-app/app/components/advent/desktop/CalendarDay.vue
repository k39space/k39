<template>
  <div class="p-2.5 text-neutral-900 aspect-square border-r border-b border-amber-800/10 nth-[7n]:border-r-0 nth-[29]:border-b-0 nth-[30]:border-b-0 nth-[31]:border-b-0">
    <div
      class="h-full w-full bg-amber-800/5 rounded-md hover:bg-amber-800/10 hover:scale-98 active:scale-95 duration-200"
      @click="openDay()"
    >
      <div class="h-full w-full grid grid-cols-2">
        <div class="h-full w-full flex flex-col justify-center items-center">
          <div
            class="text-lg/6 font-semibold font-serif text-orange-800/50"
            :class="[
              day.isDayOver && 'text-2xl/6! text-orange-800/75',
            ]"
          >
            {{ day.dayNumber }}
          </div>
        </div>
        <div class="h-full w-full flex flex-col justify-center items-center" />

        <div class="h-full w-full flex flex-col justify-center items-center" />
        <div class="h-full w-full flex flex-col justify-center items-center">
          <div v-if="!day.img">
            <UIcon
              v-if="canOpen"
              name="i-lucide-pointer"
              class="size-6 text-orange-800/75 motion-preset-pulse motion-preset-seesaw"
              :class="[
                randomDelay,
                randomDuration,
              ]"
            />
            <UIcon
              v-else
              name="i-lucide-circle-question-mark"
              class="size-10 text-orange-800/15"
            />
          </div>
          <img
            v-else
            :src="day.img"
            class="size-10"
          >
        </div>
      </div>
    </div>
  </div>
</template>

<script setup lang="ts">
import AdventModalCalendarDay from '../modal/CalendarDay.vue'

const { day } = defineProps<{ day: AdventDay }>()

const canOpen = computed(() => !day.isOpened && day.canOpen)

const randomDelay = computed(() => {
  const delays = ['motion-delay-100', 'motion-delay-200', 'motion-delay-300', 'motion-delay-500', 'motion-delay-700']
  return delays[Math.floor(Math.random() * delays.length)]
})

const randomDuration = computed(() => {
  const durations = ['motion-duration-1000', 'motion-duration-1200', 'motion-duration-1400', 'motion-duration-1600', 'motion-duration-1800']
  return durations[Math.floor(Math.random() * durations.length)]
})

const overlay = useOverlay()
const modalAdventModalCalendarDay = overlay.create(AdventModalCalendarDay)

const { pop } = useConfetti()

function openDay() {
  modalAdventModalCalendarDay.open({
    day,
    onClick: modalAdventModalCalendarDay.close,
  })

  pop()
}
</script>
