import React, { useState } from 'react';
import {
  CardActions,
  IconButton,
  Tooltip,
} from '@mui/material';
import { useHistory } from 'react-router-dom';
import DeleteIcon from '@mui/icons-material/Delete';
import EditRoundedIcon from '@mui/icons-material/EditRounded';
import NoteAddIcon from '@mui/icons-material/NoteAdd';
import { deleteGoal } from '../../store/actions/goals';
import { useDispatch } from 'react-redux';
import ConfirmDialog from '../../components/Shared/ConfirmDialog/ConfirmDialog';
import useStyles from './styles';

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

  const [ openConfirmDialog, setOpenConfirmDialog ] = useState(false);

  const handleDeleteGoal = () => {
    setOpenConfirmDialog(true)
  }

  const handleDialogClose = (confirmDelete: boolean) => {
    if (confirmDelete) {
      dispatch(deleteGoal(goalID, history))
      setOpenConfirmDialog(false)
    } else {
    setOpenConfirmDialog(false)
    }
  }

  return (
    loggedUser &&
    Object.keys(loggedUser).length !== 0 &&
    userID === goalUserID &&
    configView &&
    <CardActions>
      <ConfirmDialog
        open={openConfirmDialog}
        onClose={handleDialogClose}
        object="Goal"
      />
      <Tooltip title="Add Task">
        <IconButton
          aria-label="Add Task"
          id="Add task button"
          color="secondary"
          onClick={onAddTask}
        >
          <NoteAddIcon />
        </IconButton>
      </Tooltip>
      <Tooltip title="Edit task">
        <IconButton
          aria-label="edit goal"
          onClick={() => history.push(`/editGoal/${goalID}`)}
          color="secondary"
        >
          <EditRoundedIcon />
        </IconButton>
      </Tooltip>
      <Tooltip title="Delete task">
        <IconButton
          aria-label="delete goal"
          onClick={handleDeleteGoal}
        >
          <DeleteIcon color="secondary" />
        </IconButton>
      </Tooltip>
    </CardActions>
  );
};

export default GoalActions;
