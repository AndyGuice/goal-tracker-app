import React, { useState } from 'react';
import {
  Button,
  Grid,
  Paper,
  TextField,
} from '@material-ui/core';
import TaskModel from '../../types/task';
import useStyles from './styles';

const AddTask = (props: any) => {
  const { goal, task, onCancel, onUpdate } = props;
  const { _id: goalID, userId } = goal || { goal: {} };
  const { title, description } = task || { task: {} };

  const [taskTitle, setTaskTitle] = useState(title);
  const [taskDescription, setTaskDescription] = useState(description);

  const classes = useStyles();

  const handleSubmit = (event: React.SyntheticEvent) => {
    event.preventDefault();

    const task = new TaskModel();
    const today = new Date().toISOString();

    task.title = taskTitle.trim();
    task.createdOn = today;
    task.updatedOn = today;
    task.goalId = goalID;

    let updatedGoal = goal;
    updatedGoal.tasks.push(task);

    onUpdate(updatedGoal);
  };

  const handleCancel = () => {
    onCancel();
  };

  return (
    <Paper className={classes.paper}>
      <Grid
        xs={12}
      >
        <TextField
          id="new task title"
          aria-label="New task title"
          label="Title"
          value={taskTitle}
          variant="outlined"
          className={classes.button}
          size="small"
          onChange={(e: any) => setTaskTitle(e.target.value)}
        />
        <Button
          id="cancel-task-button"
          aria-label="Cancel task button"
          variant="outlined"
          onClick={handleCancel}
          size="small"
          style={{ color: "red" }}
          className={classes.button}
        >
          Cancel
        </Button>
        <Button
          id="save-task-button"
          aria-label="Save task button"
          color="primary"
          variant="outlined"
          onClick={handleSubmit}
          size="small"
          className={classes.button}
        >
          Save
        </Button>
      </Grid>
    </Paper>
  );
};

export default AddTask;
