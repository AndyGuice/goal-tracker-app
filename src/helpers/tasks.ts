import { addDays } from 'date-fns'

export const calculateConsecutiveDays = (task: any) => {
  const { datesCompleted } = task

  let count = 0

  if (datesCompleted.length === 0) {
    return count
  }

  const sortedDates = task.datesCompleted.sort().reverse()

  for (let i = 0; i < sortedDates.length; i++) {
    const date = new Date(sortedDates[i])
    const comparisonDate = new Date(sortedDates[i + 1])

    if (addDays(date, -1).toLocaleDateString() === comparisonDate.toLocaleDateString()) count++
  }

  return count
}
