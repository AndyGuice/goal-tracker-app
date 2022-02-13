import { addDays } from 'date-fns'

function countConsecutiveCompletionDays(listOfDays: any) {
  let count = 0

  for (let i = 0; i < listOfDays.length; i++) {
    const date = new Date(listOfDays[i])
    const comparisonDate = new Date(listOfDays[i + 1])

    if (addDays(date, -1).toLocaleDateString() !== comparisonDate.toLocaleDateString()) {
      count++
      break
    } else {
      count++
    }
  }

  return count
}

export const calculateConsecutiveDays = (task: any) => {
  const { datesCompleted } = task

  if (datesCompleted.length === 0) {
    return 0
  }

  const sortedDates = task.datesCompleted
    .sort((a: any, b: any) => new Date(a).setHours(0, 0, 0, 0) - new Date(b).setHours(0, 0, 0, 0))
    .reverse()

  const count = countConsecutiveCompletionDays(sortedDates)

  return count
}

