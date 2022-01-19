import GoalModel from '../types/goal';
import { parseISO, getWeek, getMonth } from 'date-fns';
import { format, utcToZonedTime } from "date-fns-tz";
import { createRecurringGoal } from '../store/actions/goals';
import { useDispatch } from 'react-redux';

export const CheckAndSetNewGoals = (goals: GoalModel[]) => {
  goals.map((goal: GoalModel) => {
    const recurringGoalCreated = isRecurringGoalCreated(goal)
    if (!recurringGoalCreated) {
      createNewGoal(goal)
    }
  })
}

const isRecurringGoalCreated = (goal: GoalModel) => {
  const { createdOn, cadence } = goal

  const parsedTime = parseISO(createdOn)
  const timeZone = 'America/Chicago'
  const goalCreatedOnInCST = utcToZonedTime(parsedTime, timeZone)
  const currentDate = new Date()

  checkDailyGoal(currentDate, goalCreatedOnInCST, cadence)
  checkWeeklyGoal(currentDate, goalCreatedOnInCST, cadence)
  checkMonthlyGoal(currentDate, goalCreatedOnInCST, cadence)

  return false
}

const checkDailyGoal = (currentDate: Date, goalCreatedOnInCST: Date, goalCadence: String) => {
  const today = format(currentDate, 'eeee')
  const goalCreatedDay = format(goalCreatedOnInCST, 'eeee')

  if (goalCreatedDay === today && goalCadence === 'daily') return true
  return false
}

const checkWeeklyGoal = (currentDate: Date, goalCreatedOnInCST: Date, goalCadence: String) => {
  const currentWeek = getWeek(currentDate)
  const goalCreatedWeek = getWeek(goalCreatedOnInCST)

  if (goalCreatedWeek === currentWeek && goalCadence === 'weekly') return true
  return false
}

const checkMonthlyGoal = (currentDate: Date, goalCreatedOnInCST: Date, goalCadence: String) => {
  const currentMonth = getMonth(currentDate)
  const goalCreatedMonth = getMonth(goalCreatedOnInCST)

  if (goalCreatedMonth === currentMonth && goalCadence === 'monthly') return true
  return false
}
