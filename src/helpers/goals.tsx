import GoalModel from '../types/goal';
import { parseISO } from 'date-fns';
import { format, utcToZonedTime } from "date-fns-tz";

export const CheckAndSetNewGoals = (goals: GoalModel[]) => {

  goals.map((goal: GoalModel) => {
    const createNewGoal = isNewDailyGoalNeeded(goal)
    console.log('Create New Goal: ', createNewGoal)
  })
}

const isNewDailyGoalNeeded = (goal: GoalModel) => {
  const { createdOn } = goal
  const parsedTime = parseISO(createdOn)
  const timeZone = 'America/Chicago'
  const goalCreatedInCST = utcToZonedTime(parsedTime, timeZone)
  const goalCreatedDay = format(goalCreatedInCST, 'eeee')
  const today = format(new Date(), 'eeee')

  console.log('Goal Created: ', goalCreatedDay, ' | Today is: ', today)

  if (goalCreatedDay === today) return false

  return true
}
