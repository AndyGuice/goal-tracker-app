import React, { useEffect, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import {
  CircularProgress,
  Grid,
  Paper,
} from '@material-ui/core';
import useStyles from './styles';
import { getUserGoals } from '../../store/actions/goals';
import Goals from '../../components/Goals/Goals';
import DatePicker from '../../components/Shared/DatePicker/DatePicker';

const DashboardView = () => {
  const {
    goals,
    isLoading,
  } = useSelector((state: any) => state.goals);

  const today = new Date();
  const [selectedDate, setSelectedDate] = useState(today);
  const [selectedDateStr, setSelectedDateStr] = useState(today.toLocaleDateString());

  const classes = useStyles();
  const dispatch = useDispatch();
  const profile = localStorage.getItem('profile')!;

  const [user] = useState(JSON.parse(profile));

  useEffect(() => {
    const { result } = user || { user: {} };
    const userId = result?.googleId || result?._id;

    dispatch(getUserGoals(userId));
  }, [user]);

  const handleDateChange = (date: any) => {
    setSelectedDate(date);
    setSelectedDateStr(date.toLocaleDateString());
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
            <DatePicker
              date={selectedDate}
              onChange={handleDateChange}
            />
            <Goals
              goals={goals}
              configView={false}
              date={selectedDateStr}
            />
          </Grid>
        </>
      }
    </Grid>
  );
};

export default DashboardView;
