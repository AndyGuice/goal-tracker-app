import React, { useState } from 'react';
import {
  Button,
  Grid,
  Paper,
  TextField,
} from '@mui/material';
import TaskModel from '../../types/task';
import useStyles from './styles';

const AddTask = (props: any) => {
  const { goal, task, onCancel, onUpdate } = props;
  const { _id: goalID } = goal || { goal: {} };
  const { title } = task || { task: { title: ''} };

  const [taskTitle, setTaskTitle] = useState(title);

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
        <TextField
          id="new task title"
          aria-label="New task title"
          label="Title"
          value={taskTitle}
          variant="outlined"
          size="small"
          onChange={(e: any) => setTaskTitle(e.target.value)}
          fullWidth
        />
        <Grid item textAlign="center" xs={12} sx={{ margin: 1 }}>
          <Button
            id="cancel-task-button"
            aria-label="Cancel task button"
            variant="contained"
            onClick={handleCancel}
            size="small"
            color="error"
            sx={{ margin: 1 }}
          >
            Cancel
          </Button>
          <Button
            id="save-task-button"
            aria-label="Save task button"
            color="secondary"
            variant="contained"
            onClick={handleSubmit}
            size="small"
            sx={{ margin: 1 }}
          >
            Save
          </Button>
        </Grid>
    </Paper>
  );
};

export default AddTask;
