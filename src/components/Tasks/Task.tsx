import React, { useState } from 'react';
import {
  Grid,
  IconButton,
  Paper,
  TextField,
} from '@material-ui/core';
import useStyles from './styles';
import DeleteIcon from '@material-ui/icons/Delete';
import EditRoundedIcon from '@material-ui/icons/EditRounded';

const Task = (props: any) => {
  const { task } = props;
  const { title, description } = task || { task: {} };

  const [taskTitle, setTaskTitle] = useState(title);
  const [taskDescription, setTaskDescription] = useState(description);

  const classes = useStyles();

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
            aria-label="delete goal"
            // onClick={() => dispatch(deleteGoal(goalID, history))}
            className={classes.button}
          >
            <DeleteIcon color="secondary" />
          </IconButton>
        </>
      </Grid>
    </Paper>
  );
};

export default Task;
