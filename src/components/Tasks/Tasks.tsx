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
    onUpdateTask,
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
            onUpdateGoal={onUpdateGoal}
            onUpdateTask={onUpdateTask}
          />
        )
      })
    )
  )
}

export default Tasks
