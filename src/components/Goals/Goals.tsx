import React from 'react'
import Goal from './Goal'
import GoalModel from '../../types/goal'

const Goals = (props: any) => {
  const {
    goals,
    configView,
    date,
    onUpdate,
  } = props

  return (
    goals && (goals.length > 0)
    && (
      goals.map((goal: GoalModel) => (
        <Goal
          // key={goal._id}
          key={goal.createdOn}
          goal={goal}
          configView={configView}
          date={date}
          onUpdate={onUpdate}
        />
      ))
    )
  )
}

export default Goals
