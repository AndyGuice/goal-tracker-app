import React, { useState, useEffect } from 'react';
import {
  Button,
  Card,
  CardActions,
  CardContent,
  FormControlLabel,
  Grid,
  IconButton,
  Switch,
  Typography
} from '@material-ui/core';
import { useHistory } from 'react-router-dom';
import useStyles from './styles';
import GoalModel from '../../types/goal';
import DeleteIcon from '@material-ui/icons/Delete';
import EditRoundedIcon from '@material-ui/icons/EditRounded';
import { deleteGoal, updateGoalComplete } from '../../store/actions/goals';
import { useDispatch } from 'react-redux';
import Tasks from '../Tasks/Tasks';

interface props {
  goal: GoalModel;
}

const Goal = (props: props) => {
  const { goal } = props;
  const {
    title,
    description,
    userId: goalUserID,
    _id: goalID,
    tasks,
  } = goal;

  const classes = useStyles();
  const history = useHistory();
  const dispatch = useDispatch();

  const profile = localStorage.getItem('profile')!;
  const loggedUser = JSON.parse(profile);
  const { result } = loggedUser || { result: {} };
  const { googleId, _id } = result || { googleId: {}, _id: {} };
  const userID = googleId || _id;

  // const handleSubmit = (goal: GoalModel, history: any) => {
  //   dispatch(updateGoalComplete(goal, history));
  // };

  const handleAddTask = () => {

  };

  return (
    <Grid
      item
      xs={12}
    >
      <Card className={classes.goalContainer} raised>
        <CardContent>
          <Typography
            gutterBottom
            variant="h5"
            component="h2"
            noWrap
          >
            {title}
          </Typography>
          <Typography
            variant="body2"
            color="textSecondary"
            component="p"
            gutterBottom
            noWrap
          >
            Description: {description}
          </Typography>
          <Tasks tasks={tasks} />
        </CardContent>
        <CardActions>

          {loggedUser &&
            Object.keys(loggedUser).length !== 0 &&
            userID === goalUserID &&
            <>
              <Button
                id="Add task button"
                aria-label="add task"
                color="primary"
                variant="outlined"
                onClick={() => history.push(`/addTask`)}
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
        </CardActions>
      </Card>
    </Grid>
  );
};

export default Goal;
