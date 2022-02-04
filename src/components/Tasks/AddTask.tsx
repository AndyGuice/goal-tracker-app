import React, { useState } from 'react';
import {
  Button,
  Grid,
  Paper,
  TextField,
} from '@mui/material';
import TaskModel from '../../types/task';

function AddTask(props: any) {
  const {
    goal, task, onCancel, onUpdate,
  } = props;
  const { _id: goalID } = goal || { goal: {} };
  const { title } = task || { title: '' };

  const [taskTitle, setTaskTitle] = useState(title);

  const handleSubmit = (event: React.SyntheticEvent) => {
    event.preventDefault();

    const newTask = new TaskModel();
    const today = new Date().toISOString();

    newTask.title = taskTitle.trim();
    newTask.createdOn = today;
    newTask.updatedOn = today;
    newTask.goalId = goalID;

    const updatedGoal = goal;
    updatedGoal.tasks.push(newTask);

    onUpdate(updatedGoal);
  };

  const handleCancel = () => {
    onCancel();
  };

  return (
    <Paper>
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
}

export default AddTask;
