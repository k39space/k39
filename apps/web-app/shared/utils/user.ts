export function getUserXpPercent(xp: number, xpToNextLevel: number) {
  if (xpToNextLevel <= 0) {
    return 0
  }

  const percent = Math.floor((xp / xpToNextLevel) * 100)

  return Math.min(percent, 100)
}
