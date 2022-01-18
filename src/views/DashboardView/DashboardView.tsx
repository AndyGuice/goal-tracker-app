import React, { useEffect, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import {
  CircularProgress,
  Grid,
  Paper,
  Snackbar,
  Typography,
} from '@material-ui/core';
import useStyles from './styles';
import { getUserGoals } from '../../store/actions/goals';
import Goals from '../../components/Goals/Goals'
import { DELETE_SUCCESSFUL, UPDATE_SUCCESSFUL } from '../../constants/actionTypes';
import Alert from '../../helpers/Alert';

const DashboardView = () => {
  const {
    goals,
    isLoading,
    updateSuccessful,
    deleteSuccessful
  } = useSelector((state: any) => state.goals);

  const classes = useStyles();
  const dispatch = useDispatch();
  const profile = localStorage.getItem('profile')!;

  const [showEditSuccess, setShowEditSuccess] = useState(false);
  const [showDeleteSuccess, setShowDeleteSuccess] = useState(false);
  const [user] = useState(JSON.parse(profile));

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

    dispatch({ type: UPDATE_SUCCESSFUL, payload: false });
    setShowEditSuccess(false);
  };

  const handleCloseDeleteSuccess = (event?: React.SyntheticEvent, reason?: string) => {
    if (reason === 'clickaway') {
      return;
    }

    dispatch({ type: DELETE_SUCCESSFUL, payload: false });
    setShowDeleteSuccess(false);
  };

  return (
    <Grid 
      container
      className={classes.root}
      justifyContent="center"
    >
      {isLoading ?
        <Paper>
          <CircularProgress
            size="7em"
            color="primary"
            value={100}
            className={classes.loadingPaper}
          />
        </Paper>
        :
        <>
        <Grid
          container
          spacing={3}
          className={classes.goalContainer}
        >
          <Typography 
            variant="h1"
            className={classes.title}
          >
            Today's Goals
          </Typography>
          <Goals
            goals={goals}
            cadence='daily'
          />
        </Grid>
        <Grid 
          container
          spacing={3}
          className={classes.goalContainer}
        >
          <Goals
            goals={goals}
            cadence='weekly'
          />
        </Grid>
        <Grid 
          container
          spacing={3}
          className={classes.goalContainer}
        >
         <Goals
            goals={goals}
            cadence='monthly'
          />
        </Grid>
      </>
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

export default DashboardView;
