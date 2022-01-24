import React from 'react';
import Task from './Task';
import TaskSchema from '../../types/task';

const Tasks = (props: any) => {
  const { tasks } = props;

  return (
    tasks.map((task: TaskSchema, index: number) => {
      return (
        <Task task={task} key={index} />
      );
    })
  );
};

export default Tasks;
