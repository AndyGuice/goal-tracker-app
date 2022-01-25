import React, { useEffect } from 'react';
import Task from './Task';
import TaskSchema from '../../types/task';

const Tasks = (props: any) => {
  const { tasks } = props;

  useEffect(() => {
    // console.log('Tasks: ', tasks);
  });

  return (
    tasks && tasks.length > 0 && (
      tasks.map((task: TaskSchema, index: number) => {
        return (
          <Task task={task} key={index} />
        );
      })
    )
  );
};

export default Tasks;
