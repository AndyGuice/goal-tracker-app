import React, { useEffect, useState } from 'react';
import {
  Button,
  Paper,
  Grid,
  IconButton,
  Typography
} from '@material-ui/core';
import { useHistory } from 'react-router-dom';
import useStyles from './styles';
import DeleteIcon from '@material-ui/icons/Delete';
import EditRoundedIcon from '@material-ui/icons/EditRounded';
import { deleteGoal } from '../../store/actions/goals';
import { useDispatch } from 'react-redux';
import Tasks from '../Tasks/Tasks';
import AddTask from '../Tasks/AddTask';
import AssignmentTurnedInIcon from '@material-ui/icons/AssignmentTurnedIn';

const Goal = (props: any) => {
  const { goal, configView, date } = props;
  const {
    title,
    userId: goalUserID,
    _id: goalID,
    tasks,
  } = goal;

  const classes = useStyles();
  const history = useHistory();
  const dispatch = useDispatch();

  const [showAddTask, setShowAddTask] = useState(false);

  const profile = localStorage.getItem('profile')!;
  const loggedUser = JSON.parse(profile);
  const { result } = loggedUser || { result: {} };
  const { googleId, _id } = result || { googleId: {}, _id: {} };
  const userID = googleId || _id;

  const handleSaveTask = () => {

  };

  const handleCancelTask = () => {
    setShowAddTask(!showAddTask);
  };

  return (
    <Grid
      item
      xs={12}
    >
      <Paper className={classes.paper}>
        <div style={{
          display: 'flex',
          alignItems: 'center',
          flexWrap: 'wrap',
        }}>
          <AssignmentTurnedInIcon />
          <Typography
            gutterBottom
            variant="h5"
            component="h2"
            style={{ paddingLeft: 5 }}
          >
            {title}
          </Typography>
        </div>
        {
          loggedUser &&
          Object.keys(loggedUser).length !== 0 &&
          userID === goalUserID &&
          configView &&
          <>
            <Button
              id="Add task button"
              aria-label="add task"
              color="primary"
              variant="outlined"
              onClick={() => setShowAddTask(!showAddTask)}
              className={classes.button}
            >
              Add Task
            </Button>
            <IconButton
              title="Edit goal"
              aria-label="edit goal"
              onClick={() => history.push(`/editGoal/${goalID}`)}
              className={classes.button}
            >
              <EditRoundedIcon color="secondary" />
            </IconButton>
            <IconButton
              title="Delete goal"
              aria-label="delete goal"
              onClick={() => dispatch(deleteGoal(goalID, history))}
              className={classes.button}
            >
              <DeleteIcon color="secondary" />
            </IconButton>
          </>
        }
      </Paper>
      {showAddTask && (
        <AddTask
          goal={goal}
          onCancel={handleCancelTask}
        />
      )}
      <Tasks
        tasks={tasks}
        goal={goal}
        configView={configView}
        date={date}
      />
    </Grid>
  );
};

export default Goal;
