interface DayCell {
  dayNumber: number
  day?: AdventDay
}

const DAYS_IN_DECEMBER = 31

export const useAdventStore = defineStore('advent', () => {
  const cells = ref<DayCell[]>(Array.from({ length: DAYS_IN_DECEMBER }, (_, i) => ({ dayNumber: i + 1 })))
  const days = ref<AdventDay[]>([])

  async function update() {
    try {
      const data = await $fetch('/api/advent/days')
      if (!data) {
        return
      }

      days.value = data
      cells.value = data.map((day) => ({ dayNumber: day.dayNumber, day }))
    } catch (error) {
      if (error instanceof Error) {
        if (error.message.includes('401')) {
          // No session
        }
        if (error.message.includes('404')) {
          // Not found
        }
      }
    }
  }

  return {
    days,
    cells,
    update,
  }
})
