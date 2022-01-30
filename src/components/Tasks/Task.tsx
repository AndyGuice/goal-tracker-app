import React, { useState, useEffect } from 'react';
import {
  Checkbox,
  Grid,
  IconButton,
  Paper,
  TextField,
} from '@material-ui/core';
import useStyles from './styles';
import DeleteIcon from '@material-ui/icons/Delete';
import EditRoundedIcon from '@material-ui/icons/EditRounded';
import { useDispatch } from 'react-redux';
import { useHistory } from 'react-router-dom';
import { updateGoal } from '../../store/actions/goals';

const Task = (props: any) => {
  const {
    goal,
    task,
    configView,
    date: selectedDate
  } = props;

  const {
    title,
    description,
    _id: taskID,
    datesCompleted = [],
  } = task;

  const [taskTitle, setTaskTitle] = useState(title);
  const [taskDescription, setTaskDescription] = useState(description);
  const [taskComplete, setTaskComplete] = useState(false);

  const classes = useStyles();
  const dispatch = useDispatch();
  const history = useHistory();

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

    // console.log('Updated Task: ', updatedTask);

    dispatch(updateGoal(goal, history));
  };

  const handleDeleteTask = (id: any) => {
    // console.log('Tasks Before: ', goal.tasks);
    let updatedGoal = goal;

    const updatedTasks = goal.tasks.filter((task: any) => task._id !== id);
    updatedGoal.tasks = updatedTasks;

    // console.log('Updated Goal: ', updatedGoal);

    dispatch(updateGoal(updatedGoal, history));
  };

  return (
    <Paper className={classes.paper}>
      <Grid
        item
        xs={6}
      >
        <TextField
          id="Task title"
          aria-label="Task title"
          value={taskTitle}
          className={classes.input}
          label="Task Name"
          size="small"
          onChange={(e: any) => setTaskTitle(e.target.value)}
        />
        <TextField
          id="Task description"
          aria-label="Task description"
          value={taskDescription}
          className={classes.input}
          label="Task Description"
          size="small"
          onChange={(e: any) => setTaskDescription(e.target.value)}
        />
        {!configView &&
          <Checkbox
            checked={taskComplete}
            onClick={() => handleUpdateTask(!taskComplete)}
          />
        }
        {
          loggedUser &&
          Object.keys(loggedUser).length !== 0 &&
          configView &&
          <>
            <IconButton
              title="Edit goal"
              aria-label="edit goal"
              // onClick={() => history.push(`/editGoal/${goalID}`)}
              className={classes.button}
            >
              <EditRoundedIcon color="secondary" />
            </IconButton>
            <IconButton
              title="Delete goal"
              aria-label="Delete goal"
              onClick={() => handleDeleteTask(taskID)}
              className={classes.button}
            >
              <DeleteIcon color="secondary" />
            </IconButton>
          </>
        }
      </Grid>
    </Paper>
  );
};

export default Task;
