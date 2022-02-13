import { addDays } from 'date-fns'

export const calculateConsecutiveDays = (task: any) => {
  const { datesCompleted } = task

  let count = 0

  if (datesCompleted.length === 0) {
    return count
  }

  const sortedDates = task.datesCompleted
    .sort((a: any, b: any) => new Date(a).setHours(0, 0, 0, 0) - new Date(b).setHours(0, 0, 0, 0))
    .reverse()

  const today = new Date()
  const yesterday = addDays(today, -1)

  if (today.toLocaleDateString() === sortedDates[0]) {
    console.log('Catch 1')

    if (yesterday.toLocaleDateString() === sortedDates[1]) {
      for (let i = 0; i < sortedDates.length; i++) {
        const date = new Date(sortedDates[i])
        const comparisonDate = new Date(sortedDates[i + 1])

        if (addDays(date, -1).toLocaleDateString() !== comparisonDate.toLocaleDateString()) {
          count++
          break
        } else {
          count++
        }
      }
    }

  } else if (yesterday.toLocaleDateString() === sortedDates[0]) {

    for (let i = 0; i < sortedDates.length; i++) {
      const date = new Date(sortedDates[i])
      const comparisonDate = new Date(sortedDates[i + 1])

      if (addDays(date, -1).toLocaleDateString() !== comparisonDate.toLocaleDateString()) {
        count++
        break
      } else {
        count++
      }
    }
  }

  return count
}
