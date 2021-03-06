import React from 'react'
import Task from './Task'
import TaskSchema from '../../types/task'

const Tasks = (props: any) => {
  const {
    tasks,
    configView,
    date,
    goal,
    onUpdateGoal,
  } = props

  return (
    tasks && tasks.length > 0 && (
      tasks.map((task: TaskSchema) => {
        return (
          <Task
            goal={goal}
            task={task}
            key={task.createdOn}
            configView={configView}
            date={date}
          />
        )
      })
    )
  )
}

export default Tasks
