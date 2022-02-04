import React, { useEffect, useState } from 'react';
import {
  Box,
  Button,
  Grid,
  Paper,
  TextField,
  Typography
} from '@mui/material';
import GoalModel from '../../types/goal';
import { useDispatch, useSelector } from 'react-redux';
import { ERROR } from '../../store/actionTypes/actionTypes';
// import { useHistory } from 'react-router-dom';
import { createGoal } from '../../store/actions/goals';
import useStyles from './styles';
import ErrorDialog from "../Shared/ErrorDialog/ErrorDialog";

const AddGoal = () => {
  const classes = useStyles();
  // const history = useHistory();
  const dispatch = useDispatch();
  const { error } = useSelector((state: any) => state.error);

  const [goalTitle, setGoalTitle] = useState('');
  const [goalDescription, setGoalDescription] = useState('');
  // const [goalStart, setGoalStart] = useState('');
  // const [goalEnd, setGoalEnd] = useState('');

  const profile = localStorage.getItem('profile')!;
  const [user] = useState(JSON.parse(profile));

  useEffect(() => {
    if (error) {
      setSubmitError(error);
      setOpenErrorDialog(true);
      dispatch({ type: ERROR, data: null });
    }
    // eslint-disable-next-line
  }, [error]);

  const [submitError, setSubmitError] = useState('');
  const [openErrorDialog, setOpenErrorDialog] = useState(false);

  const handleSubmit = (event: React.SyntheticEvent) => {
    event.preventDefault();

    const { result } = user;
    const { googleId } = result;

    const goal = new GoalModel();
    const today = new Date().toISOString();

    goal.title = goalTitle.trim();
    goal.description = goalDescription.trim();
    goal.userId = googleId || result._id;
    goal.createdOn = today;
    goal.updatedOn = today;

    const goalResult = validateGoal(goal);
    if (!goalResult.ok) {
      return dispatch({ type: ERROR, data: { error: goalResult.error } });
    }

    dispatch(createGoal(goal, history));
  };

  const validateGoal = (goal: GoalModel) => {
    if (goal.title.trim().length === 0) {
      return { ok: false, error: "No goal title" };
    }
    return { ok: true };
  };

  const handleDialogClose = () => {
    setOpenErrorDialog(false);
  };

  return (
    <Grid
      container
      justifyContent="center"
      component="main"
    >
      <ErrorDialog
        open={openErrorDialog}
        onClose={handleDialogClose}
        error={submitError}
        action="Create goal...?"
      />
      <form onSubmit={handleSubmit}>
        <Paper className={classes.paper} elevation={6} sx={{ marginTop: 2 }}>
          <Grid item xs={12}>
            <Typography
              id="goal-add-button"
              align="center"
              gutterBottom
            >
              Add Goal
            </Typography>
            <TextField
              id="goal-title-input"
              onChange={(e) => { setGoalTitle(e.target.value); }}
              value={goalTitle}
              label="Goal Name"
              placeholder="Enter goal name"
              fullWidth
              sx={{
                marginBottom: 2
              }}
            />
            <TextField
              id="goal-description-input"
              onChange={(e) => { setGoalDescription(e.target.value); }}
              label="Goal Description"
              value={goalDescription}
              placeholder="Enter goal description"
              fullWidth
            />
            <Box textAlign="center">
              <Button
                type="submit"
                variant="contained"
                color="primary"
                style={{ margin: 10, marginTop: 20 }}
              >
                Submit
              </Button>
            </Box>
          </Grid>
        </Paper>
      </form>
    </Grid>
  );
};

export default AddGoal;
