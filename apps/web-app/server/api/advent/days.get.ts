import { db } from '@k39/database'

const days: AdventDay[] = [
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
]

export default defineEventHandler(async (event) => {
  try {
    const userInDB = await db.user.find(event.context?.user?.id)
    if (!userInDB) {
      // Return base objects
      return days
    }

    // Return days with user data
    return days
  } catch (error) {
    throw errorResolver(error)
  }
})
