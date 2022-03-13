import React from 'react'
import Task from './Task'
import TaskSchema from '../../types/task'

const Tasks = (props: any) => {
  const {
    tasks,
    date,
    goal,
  } = props

  return (
    tasks && tasks.length > 0 && (
      tasks.map((task: TaskSchema) => {
        return (
          <Task
            goal={goal}
            task={task}
            key={task.createdOn}
            date={date}
          />
        )
      })
    )
  )
}

export default Tasks
