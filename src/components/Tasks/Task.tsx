import React, { useState, useEffect } from 'react';
import {
  Checkbox,
  FormControlLabel,
  Grid,
  IconButton,
  Paper,
  TextField,
} from '@material-ui/core';
import useStyles from './styles';
import DeleteIcon from '@material-ui/icons/Delete';

const Task = (props: any) => {
  const {
    goal,
    task,
    configView,
    date: selectedDate,
    onUpdate,
  } = props;

  const {
    title,
    _id: taskID,
    datesCompleted = [],
  } = task;

  const [taskTitle, setTaskTitle] = useState(title);
  const [taskComplete, setTaskComplete] = useState(false);
  const [edit, setEdit] = useState(false);

  const classes = useStyles();

  const profile = localStorage.getItem('profile')!;
  const loggedUser = JSON.parse(profile);

  useEffect(() => {
    if (datesCompleted.includes(selectedDate)) {
      setTaskComplete(true);
    } else {
      setTaskComplete(false);
    }
  }, [selectedDate]);

  const handleUpdateTask = (status: boolean) => {
    setTaskComplete(status);

    let updatedTask = task;

    if (status) {
      updatedTask.datesCompleted = [...datesCompleted, selectedDate];
    } else {
      const updatedDatesCompleted = updatedTask.datesCompleted.filter((date: any) => (date !== selectedDate));
      updatedTask.datesCompleted = updatedDatesCompleted;
    }

    onUpdate(goal);
  };

  const handleDeleteTask = (id: any) => {
    let updatedGoal = goal;

    const updatedTasks = goal.tasks.filter((task: any) => task._id !== id);
    updatedGoal.tasks = updatedTasks;

    onUpdate(updatedGoal);
  };

  return (
    <Paper className={classes.paper}>
      <Grid
        item
        xs={12}
      >
        <TextField
          id="Task title"
          aria-label="Task title"
          value={taskTitle}
          className={classes.input}
          size="small"
          disabled={!edit}
          onChange={(e: any) => setTaskTitle(e.target.value)}
        />
        {!configView &&
          <div style={{ display: "flex", justifyContent: "flex-end", paddingRight: 5 }}>
            <FormControlLabel
              label="Complete"
              labelPlacement="start"
              control={
                <Checkbox
                  checked={taskComplete}
                  onClick={() => handleUpdateTask(!taskComplete)}
                />
              }
            />
          </div>
        }
        {
          loggedUser &&
          Object.keys(loggedUser).length !== 0 &&
          configView &&
          <IconButton
            title="Delete task"
            aria-label="Delete task"
            onClick={() => handleDeleteTask(taskID)}
            className={classes.button}
          >
            <DeleteIcon color="secondary" />
          </IconButton>
        }
      </Grid>
    </Paper>
  );
};

export default Task;
