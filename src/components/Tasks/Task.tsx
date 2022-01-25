import React, { useState, useEffect } from 'react';
import {
  Grid,
  Paper,
  TextField,
} from '@material-ui/core';
import { useDispatch } from 'react-redux';
import { useHistory } from 'react-router-dom';
import useStyles from './styles';

const Task = (props: any) => {
  const { goal, task, onCancel } = props;
  const { title, description } = task || { task: {} };

  const [taskTitle, setTaskTitle] = useState(title);
  const [taskDescription, setTaskDescription] = useState(description);

  const classes = useStyles();
  const dispatch = useDispatch();

  const handleCancel = () => {
    onCancel();
  };

  return (
    <Paper className={classes.paper}>
      <Grid
        xs={6}
      >
        <TextField
          id="Task title"
          aria-label="Task title"
          value={taskTitle}
          className={classes.button}
          onChange={(e: any) => setTaskTitle(e.target.value)}
        />
        <TextField
          id="Task description"
          aria-label="Task description"
          value={taskDescription}
          className={classes.button}
          onChange={(e: any) => setTaskDescription(e.target.value)}
        />
      </Grid>
    </Paper>
  );
};

export default Task;
