import React from 'react';
import {
  Box,
  CardActions,
  IconButton,
  Tooltip,
} from '@material-ui/core';
import { useHistory } from 'react-router-dom';
import useStyles from './styles';
import DeleteIcon from '@material-ui/icons/Delete';
import EditRoundedIcon from '@material-ui/icons/EditRounded';
import { deleteGoal } from '../../store/actions/goals';
import { useDispatch } from 'react-redux';
import NoteAddIcon from '@material-ui/icons/NoteAdd';

const GoalActions = (props: any) => {
  const {
    goal,
    configView,
    onAddTask
  } = props;

  const {
    userId: goalUserID,
    _id: goalID,
  } = goal;

  const classes = useStyles();
  const history = useHistory();
  const dispatch = useDispatch();

  const profile = localStorage.getItem('profile')!;
  const loggedUser = JSON.parse(profile);
  const { result } = loggedUser || { result: {} };
  const { googleId, _id } = result || { googleId: {}, _id: {} };
  const userID = googleId || _id;

  return (
    loggedUser &&
    Object.keys(loggedUser).length !== 0 &&
    userID === goalUserID &&
    configView &&
    <CardActions>
      <Tooltip title="Add Task">
        <IconButton
          aria-label="Add Task"
          id="Add task button"
          color="primary"
          onClick={onAddTask}
          className={classes.button}
          size="small"
        >
          <NoteAddIcon />
        </IconButton>
      </Tooltip>
      <Tooltip title="Edit task">
        <IconButton
          aria-label="edit goal"
          onClick={() => history.push(`/editGoal/${goalID}`)}
          className={classes.button}
          color="secondary"
          size="small"
        >
          <EditRoundedIcon />
        </IconButton>
      </Tooltip>
      <Tooltip title="Delete task">
        <IconButton
          aria-label="delete goal"
          onClick={() => dispatch(deleteGoal(goalID, history))}
          className={classes.button}
          size="small"
        >
          <DeleteIcon color="secondary" />
        </IconButton>
      </Tooltip>
    </CardActions>
  );
};

export default GoalActions;
