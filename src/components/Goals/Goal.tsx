import React, { useState, useEffect } from 'react';
import {
  Button,
  Card,
  CardActions,
  CardContent,
  FormControlLabel,
  Grid,
  IconButton,
  Typography
} from '@material-ui/core';
import { useHistory } from 'react-router-dom';
import useStyles from './styles';
import GoalModel from '../../types/goal';
import DeleteIcon from '@material-ui/icons/Delete';
import EditRoundedIcon from '@material-ui/icons/EditRounded';
import { deleteGoal } from '../../store/actions/goals';
import { useDispatch } from 'react-redux';
import Tasks from '../Tasks/Tasks';
import AddTask from '../Tasks/AddTask';
import AssignmentTurnedInIcon from '@material-ui/icons/AssignmentTurnedIn';

const Goal = (props: any) => {
  const { goal, configView } = props;
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
      <Card className={classes.goalContainer} raised>
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
            >
              Add Task
            </Button>
            <IconButton
              title="Edit goal"
              aria-label="edit goal"
              onClick={() => history.push(`/editGoal/${goalID}`)}
            >
              <EditRoundedIcon fontSize="small" color="secondary" />
            </IconButton>
            <IconButton
              title="Delete goal"
              aria-label="delete goal"
              onClick={() => dispatch(deleteGoal(goalID, history))}
            >
              <DeleteIcon fontSize="small" color="secondary" />
            </IconButton>
          </>
        }
      </Card>
      {showAddTask && (
        <AddTask
          goal={goal}
          onCancel={handleCancelTask}
        />
      )}
      <Tasks
        tasks={tasks}
        goalID={goalID}
      />
    </Grid>
  );
};

export default Goal;
