import React, { useEffect, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import {
  Grid,
  CircularProgress,
  Button,
  Snackbar,
} from '@mui/material';
import useStyles from './styles';
import { useHistory } from 'react-router';
import {
  getUserGoals,
  updateGoal,
} from '../../store/actions/goals';
import Goals from '../../components/Goals/Goals';
import { DELETE_GOAL_SUCCESS, UPDATE_GOAL_SUCCESS } from '../../store/actionTypes/actionTypes';
import Alert from '../../helpers/Alert';

const GoalsView = () => {
  const {
    goals,
    isLoading,
    updateSuccessful,
    deleteSuccessful
  } = useSelector((state: any) => state.goals);

  const history = useHistory();
  const classes = useStyles();
  const dispatch = useDispatch();
  const profile = localStorage.getItem('profile')!;

  const [showEditSuccess, setShowEditSuccess] = useState(false);
  const [showDeleteSuccess, setShowDeleteSuccess] = useState(false);
  const [
    user,
  ] = useState(JSON.parse(profile));

  useEffect(() => {
    if (updateSuccessful) {
      setShowEditSuccess(true);
    }
  }, [updateSuccessful]);

  useEffect(() => {
    if (deleteSuccessful) {
      setShowDeleteSuccess(deleteSuccessful);
    }
  }, [deleteSuccessful]);


  useEffect(() => {
    const { result } = user || { user: {} };
    const userId = result?.googleId || result?._id;

    dispatch(getUserGoals(userId));
  }, [dispatch, user]);

  const handleCloseEditSuccess = (event?: React.SyntheticEvent, reason?: string) => {
    if (reason === 'clickaway') {
      return;
    }

    dispatch({ type: UPDATE_GOAL_SUCCESS, payload: false });
    setShowEditSuccess(false);
  };

  const handleCloseDeleteSuccess = (event?: React.SyntheticEvent, reason?: string) => {
    if (reason === 'clickaway') {
      return;
    }

    dispatch({ type: DELETE_GOAL_SUCCESS, payload: false });
    setShowDeleteSuccess(false);
  };

  const handleUpdateGoals = (goal: any) => {
    dispatch(updateGoal(goal, history));
  };

  return (
    <Grid container justifyContent="center" className={classes.root}>
      {user?.result &&
        <Button
          variant="contained"
          color="primary"
          onClick={() => history.push("/addGoal")}
          sx={{
            marginTop: 2,
            marginBottom: 2,
            width: "80%"
          }}
        >
          Add goal
        </Button>
      }
      {isLoading ?
        <CircularProgress
          size="7em"
          color="primary"
          value={100}
        />
        :
        <Goals
          goals={goals}
          configView={true}
          onUpdate={(e: any) => handleUpdateGoals(e)}
        />
      }
      <Snackbar
        open={showEditSuccess}
        autoHideDuration={6000}
        onClose={handleCloseEditSuccess}
      >
        <Alert
          onClose={handleCloseEditSuccess}
          severity="success"
        >
          Edit successful
        </Alert>
      </Snackbar>
      <Snackbar
        open={showDeleteSuccess}
        autoHideDuration={6000}
        onClose={handleCloseDeleteSuccess}
      >
        <Alert
          onClose={handleCloseDeleteSuccess}
          severity="success"
        >
          Delete successful
        </Alert>
      </Snackbar>
    </Grid>
  );
};

export default GoalsView;
