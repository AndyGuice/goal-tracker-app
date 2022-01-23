import React, { useEffect, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import {
  CircularProgress,
  Grid,
  Paper,
  Typography,
} from '@material-ui/core';
import useStyles from './styles';
import { getUserGoals } from '../../store/actions/goals';
import Goals from '../../components/Goals/Goals';

const DashboardView = () => {
  const {
    goals,
    isLoading,
  } = useSelector((state: any) => state.goals);

  const classes = useStyles();
  const dispatch = useDispatch();
  const profile = localStorage.getItem('profile')!;

  const [user] = useState(JSON.parse(profile));

  useEffect(() => {
    const { result } = user || { user: {} };
    const userId = result?.googleId || result?._id;

    dispatch(getUserGoals(userId));
  }, [dispatch, user]);

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
            />
          </Grid>
        </>
      }
    </Grid>
  );
};

export default DashboardView;
