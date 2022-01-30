import React from 'react';
import Task from './Task';
import TaskSchema from '../../types/task';

const Tasks = (props: any) => {
  const { tasks, goal, configView, date } = props;

  return (
    tasks && tasks.length > 0 && (
      tasks.map((task: TaskSchema, index: number) => {
        return (
          <Task
            task={task}
            key={index}
            configView={configView}
            date={date}
          />
        );
      })
    )
  );
};

export default Tasks;
