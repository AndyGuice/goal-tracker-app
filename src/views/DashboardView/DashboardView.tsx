import React, { useEffect, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import {
  CircularProgress,
  Grid,
} from '@mui/material';
// import { useHistory } from 'react-router';
import { getUserGoals, updateTaskComplete } from '../../store/actions/goals';
import Goals from '../../components/Goals/Goals';
import DatePicker from '../../components/Shared/DatePicker/DatePicker';
import useStyles from './styles';

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
  // const history = useHistory();
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

  const handleUpdateGoals = (goal: any) => {
    dispatch(updateTaskComplete(goal, history));
  };

  return (
    <Grid
      container
      className={classes.root}
      justifyContent="center"
    >
      {isLoading ?
        <CircularProgress
          size="7em"
          color="primary"
          value={100}
          className={classes.progressCircle}
        />
        :
        <>
          <DatePicker
            date={selectedDate}
            onChange={handleDateChange}
          />
          <Goals
            goals={goals}
            configView={false}
            date={selectedDateStr}
            onUpdate={(e: any) => handleUpdateGoals(e)}
          />
        </>
      }
    </Grid>
  );
};

export default DashboardView;
