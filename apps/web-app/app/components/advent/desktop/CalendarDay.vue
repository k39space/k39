<template>
  <div
    class="h-full w-full bg-amber-800/5 rounded-md hover:bg-amber-800/10 hover:scale-98 active:scale-95 duration-200 cursor-pointer group motion-preset-slide-left"
    @click="openDay()"
  >
    <div class="h-full w-full grid grid-cols-2">
      <div class="aspect-square h-full w-full flex flex-col justify-center items-center">
        <div
          class="text-lg/6 font-semibold font-serif text-orange-800/50"
          :class="[
            day.isDayOver && 'text-xl/6! text-orange-800/75',
          ]"
        >
          {{ day.dayNumber }}
        </div>
      </div>
      <div class="h-full w-full flex flex-col justify-center items-center" />

      <div class="h-full w-full flex flex-col justify-center items-center" />
      <div class="aspect-square h-full w-full flex flex-col justify-center items-center">
        <div v-if="!day.isOpened">
          <UIcon
            v-if="day.canOpen"
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
          v-else-if="day.isOpened && imgSrc"
          :src="imgSrc"
          class="size-10 group-hover:scale-120 duration-200"
        >
      </div>
    </div>
  </div>
</template>

<script setup lang="ts">
import AdventModalCalendarDay from '../modal/CalendarDay.vue'
import AdventModalStory from '../modal/Story.vue'

const { day } = defineProps<{ day: AdventDay }>()

const userStore = useUserStore()

const randomDelay = computed(() => {
  const delays = ['motion-delay-100', 'motion-delay-200', 'motion-delay-300', 'motion-delay-500', 'motion-delay-700']
  return delays[Math.floor(Math.random() * delays.length)]
})

const randomDuration = computed(() => {
  const durations = ['motion-duration-1000', 'motion-duration-1200', 'motion-duration-1400', 'motion-duration-1600', 'motion-duration-1800']
  return durations[Math.floor(Math.random() * durations.length)]
})

const imgSrc = computed(() => {
  switch (day.type) {
    case 'message':
      return '/img/advent/bauble.png'
    case 'story':
      return '/img/advent/fox.png'
    case 'community-trees':
      return '/img/advent/pine.png'
    case 'community-wish':
      return '/img/advent/christmas-card.png'
    case 'community-food-table':
      return '/img/advent/food-tray.png'
    case 'fortune-cookie':
      return '/img/advent/fortune-cookie.png'
    case 'association-with-food':
      return '/img/advent/chocolate.png'
    case 'present-idea':
      return '/img/advent/socks.png'
    case 'light':
      return '/img/advent/lights.png'
    case 'favorite-music':
      return '/img/advent/carol.png'
    case 'favorite-film':
      return '/img/advent/clapperboard.png'
    case 'negativity':
      return '/img/advent/bonfire.png'
    case 'community-goals':
      return '/img/advent/snow-globe.png'
    case 'companion':
      return '/img/advent/teapot.png'
    case 'deer':
      return '/img/advent/deer.png'
    case 'polar-bear':
      return '/img/advent/polar-bear.png'
    case 'penguin':
      return '/img/advent/penguin.png'
    case 'riddle':
      return '/img/advent/candy-cane.png'
    case 'share':
      return '/img/advent/mitten.png'
    default:
      return ''
  }
})

const overlay = useOverlay()
const modalAdventModalCalendarDay = overlay.create(AdventModalCalendarDay)
const modalAdventModalStory = overlay.create(AdventModalStory)

const { pop } = useConfetti()

function openDay() {
  if (!userStore.loggedIn) {
    tryActionThatRequiresAuth()
    return
  }

  // It's locked
  if (!day.canOpen) {
    return
  }

  // It's not locked and not opened
  if (day.canOpen && !day.isOpened) {
    // First time opening the day
    pop()
    // Send request to open the day?
  }

  if (day.type === 'message') {
    modalAdventModalCalendarDay.open({
      day,
      onClick: modalAdventModalCalendarDay.close,
    })
  }

  if (day.type === 'story') {
    modalAdventModalStory.open({
      day,
      onClick: modalAdventModalStory.close,
    })
  }
}
</script>
