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
import { updateTask } from '../../store/actions/tasks';

const Task = (props: any) => {
  const { task, configView, date: selectedDate } = props;
  const {
    title,
    description,
    _id: taskID,
    trackedDates = [],
  } = task;

  const [taskTitle, setTaskTitle] = useState(title);
  const [taskDescription, setTaskDescription] = useState(description);
  const [taskTrackedDates, changeTaskTrackedDates] = useState(trackedDates);
  const [taskComplete, setTaskComplete] = useState<any>(false);

  const classes = useStyles();
  const dispatch = useDispatch();
  const history = useHistory();

  const profile = localStorage.getItem('profile')!;
  const loggedUser = JSON.parse(profile);

  const today = new Date().toLocaleDateString();

  useEffect(() => {

  }, [selectedDate]);

  const handleUpdateTask = (status: Boolean) => {

  };

  const handleDeleteTask = () => {

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
              aria-label="delete goal"
              // onClick={() => handleDeleteTask(goal, currentTaskID)}
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
