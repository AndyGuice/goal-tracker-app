import React, { useEffect, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import {
  Grid,
  CircularProgress,
  Button,
} from '@mui/material';
import useStyles from './styles';
import { useHistory } from 'react-router';
import {
  getUserGoals,
  updateGoal,
} from '../../store/actions/goals';
import Goals from '../../components/Goals/Goals';
import ErrorDialog from '../../components/Shared/ErrorDialog/ErrorDialog';
import { ERROR } from '../../store/actionTypes/actionTypes';

const GoalsView = () => {
  const { error } = useSelector((state: any) => state.error);
  const {
    goals,
    isLoading,
  } = useSelector((state: any) => state.goals);

  const history = useHistory();
  const classes = useStyles();
  const dispatch = useDispatch();
  const profile = localStorage.getItem('profile')!;

  const [submitError, setSubmitError] = useState('');
  const [openErrorDialog, setOpenErrorDialog] = useState(false);

  const [
    user,
  ] = useState(JSON.parse(profile));

  useEffect(() => {
    if (error) {
      setSubmitError(error);
      setOpenErrorDialog(true);
      dispatch({ type: ERROR, data: null });
    }
    // eslint-disable-next-line
  }, [error]);

  useEffect(() => {
    const { result } = user || { user: {} };
    const userId = result?.googleId || result?._id;

    dispatch(getUserGoals(userId));
  }, [dispatch, user]);

  const handleUpdateGoal = (goal: any) => {
    dispatch(updateGoal(goal, history));
  };

  const handleDialogClose = () => {
    setOpenErrorDialog(false);
  };

  return (
    <Grid container justifyContent="center" className={classes.root}>
      <ErrorDialog
        open={openErrorDialog}
        onClose={handleDialogClose}
        error={submitError}
        action="Login"
      />
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
          onUpdate={handleUpdateGoal}
        />
      }
    </Grid>
  );
};

export default GoalsView;
