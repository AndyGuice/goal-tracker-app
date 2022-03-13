import React from 'react'
import Goal from './Goal'
import GoalModel from '../../types/goal'

const Goals = (props: any) => {
  const {
    goals,
    date,
  } = props

  return (
    goals && (goals.length > 0)
    && (
      goals.map((goal: GoalModel) => (
        <Goal
          key={goal.createdOn}
          goal={goal}
          date={date}
        />
      ))
    )
  )
}

export default Goals
