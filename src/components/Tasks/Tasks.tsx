import React from 'react';
import Task from './Task';
import TaskSchema from '../../types/task';

const Tasks = (props: any) => {
  const {
    tasks,
    configView,
    date,
    goal,
    onUpdate,
  } = props;

  return (
    tasks && tasks.length > 0 && (
      tasks.map((task: TaskSchema) => {
        return (
          <Task
            goal={goal}
            task={task}
            key={task._id}
            configView={configView}
            date={date}
            onUpdate={onUpdate}
          />
        );
      })
    )
  );
};

export default Tasks;
