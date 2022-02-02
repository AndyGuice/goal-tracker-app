import React, { useState } from 'react';
import {
  Paper,
  Typography
} from '@material-ui/core';
import useStyles from './styles';
import AddTask from '../Tasks/AddTask';
import AssignmentTurnedInIcon from '@material-ui/icons/AssignmentTurnedIn';
import Tasks from '../Tasks/Tasks';
import GoalActions from './GoalActions';

const Goal = (props: any) => {
  const {
    goal,
    configView,
    date,
    onUpdate
  } = props;

  const {
    title,
    tasks,
  } = goal;

  const classes = useStyles();
  const [showAddTask, setShowAddTask] = useState(false);

  const handleCancelTask = () => {
    setShowAddTask(false);
  };

  const handleAddTask = () => {
    setShowAddTask(true);
  };

  return (
    <>
      <Paper className={classes.paper} elevation={6}>
        <AssignmentTurnedInIcon
          style={{ marginLeft: 10 }}
        />
        <Typography
          className={classes.title}
        >
          {title}
        </Typography>
        <GoalActions
          onAddTask={handleAddTask}
          configView={configView}
          goal={goal}
        />
      </Paper>
      {showAddTask && (
        <AddTask
          goal={goal}
          onCancel={handleCancelTask}
          onUpdate={onUpdate}
        />
      )}
      {tasks && (
        <Tasks
          configView={configView}
          date={date}
          goal={goal}
          tasks={tasks}
          onUpdate={onUpdate}
        />
      )}
    </>
  );
};

export default Goal;
