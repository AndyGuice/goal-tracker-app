import React, { useEffect, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import {
  Grid,
  CircularProgress,
  Grow,
  Paper,
  Container,
  Snackbar,
  Typography,
} from '@material-ui/core';
import useStyles from './styles';
import { getUserGoals } from '../../store/actions/goals';
import GoalModel from '../../types/goal';
import Goal from '../Goals/Goal';
import { DELETE_SUCCESSFUL, UPDATE_SUCCESSFUL } from '../../constants/actionTypes';
import Alert from '../../helpers/Alert';
import { displayGoalOnCadence } from '../../helpers/cadence'

const Dashboard = () => {
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
  const [
    user, 
    // setUser
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
    displayGoalOnCadence('daily', 3)
  })

  useEffect(() => {
    const { result } = user || { user: {} };
    const userId = result?.googleId || result?._id;

    dispatch(getUserGoals(userId));
  // eslint-disable-next-line
  }, [dispatch]);

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
    <Container style={{ marginTop: "100px" }}>
      <Typography variant="h1">Today's Goals</Typography>
      {isLoading ?
        <Paper elevation={6} className={classes.loadingPaper}>
          <CircularProgress size="7em" color="primary" value={100} />
        </Paper>
        :
        <Grow in={true} timeout={{ enter: 1500 }}>
          <Grid container spacing={3}>
            {
              goals?.map((goal: GoalModel, index: number) => (
                <Goal goal={goal} key={index} setupView={false} />
              ))
            }
          </Grid>
        </Grow>
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
    </Container>
  );
};

export default Dashboard;
