import React, { useEffect, useState } from 'react';
import {
  Box,
  Button,
  CircularProgress,
  FormControl,
  FormControlLabel,
  Grid,
  InputLabel,
  MenuItem,
  Paper,
  Select,
  Snackbar,
  TextField,
  Typography
} from '@material-ui/core';
import useStyles from './styles';
import GoalModel from '../../../types/goal';
import { useDispatch, useSelector } from 'react-redux';
import { ERROR } from '../../../constants/actionTypes';
import Alert from '../../../helpers/Alert';
import { useHistory, useParams } from 'react-router-dom';
import { getGoal, updateGoal } from '../../../store/actions/goals';

export const EditGoal = () => {
  const { id } = useParams<any>();
  const classes = useStyles();
  const history = useHistory();
  const dispatch = useDispatch();
  const { goal, isLoading } = useSelector((state: any) => state.goals);
  const { error } = useSelector((state: any) => state.error);
  const [showError, setShowError] = useState(false);
  const [goalTitle, setGoalTitle] = useState(goal?.title);
  const [goalDescription, setGoalDescription] = useState('');
  const [goalCadence, setGoalCadence] = useState('Daily');
  const [goalComplete, setGoalComplete] = useState(false);
  const profile = localStorage.getItem('profile')!;
  const [
    user, 
    // setUser
  ] = useState(JSON.parse(profile));

  useEffect(() => {
    if (error) {
      setShowError(true);
    }
  }, [error]);

  useEffect(() => {
    dispatch(getGoal(id));
  // eslint-disable-next-line
  }, [id]);

  useEffect(() => {
    if (goal) {
      setGoalTitle(goal.title);
      setGoalDescription(goal.description);
      setGoalCadence(goal.cadence);
      setGoalComplete(goal.complete);
    }
  }, [goal]);

  const handleClose = (event?: React.SyntheticEvent, reason?: string) => {
    if (reason === 'clickaway') {
      return;
    }

    dispatch({ type: ERROR, data: null });
    setShowError(false);
  };

  const handleSubmit = (event: React.SyntheticEvent) => {
    event.preventDefault();
    const goal = new GoalModel();

    goal.title = goalTitle.trim();
    goal.description = goalDescription.trim();
    goal.cadence = goalCadence;
    goal.userId = user.result._id;
    goal._id = id;

    const goalResult = validateGoal(goal);
    if (!goalResult.ok) {
      return dispatch({ type: ERROR, data: { error: goalResult.error } });
    }

    dispatch(updateGoal(goal, history));
  };

  const validateGoal = (goal: GoalModel) => {
    if (goal.title.trim().length === 0) {
      return { ok: false, error: "No goal name" };
    }
    if (goal.description.trim().length === 0) {
      return { ok: false, error: "No goal description" };
    }
    return { ok: true };
  };


  if (isLoading) {
    return (
      <Grid
        container
        component="main" 
        style={{ marginTop: "100px" }}
      >
        <Paper
          elevation={6}
          className={classes.loadingPaper}
          style={{ marginTop: "80px" }}
        >
          <CircularProgress size="7em" color="secondary" />
        </Paper>
      </Grid>
    );
  }

  return (
    <Grid 
      container
      justifyContent="center"
      component="main"
    >
      <form onSubmit={handleSubmit}>
        <Paper className={classes.paper} elevation={6}>
            <Grid item xs={12}>
              <Typography
                id="goal-edit-button"
                component="h2"
                variant="h5"
                align="center"
                gutterBottom
              >
                Edit Goal
              </Typography>
              <TextField
                id="goal-title-input"
                label="Goal Title"
                onChange={(e) => { setGoalTitle(e.target.value); }}
                value={goalTitle}
                placeholder="Goal name"
                fullWidth
              />
              <TextField
                id="goal-description-input"
                label="Goal Description"
                onChange={(e) => { setGoalDescription(e.target.value); }}
                value={goalDescription}
                placeholder="Goal description"
                fullWidth
              />
              <FormControl fullWidth>
                <InputLabel id="goal-cadence-select-label">Cadence</InputLabel>
                <Select
                  labelId="goal-cadence-select-label"
                  id="goal-cadence-select"
                  value={goalCadence}
                  label="Cadence"
                  onChange={(e: any) => setGoalCadence(e.target.value)}
                >
                  <MenuItem value={"daily"}>Daily</MenuItem>
                  <MenuItem value={"weekly"}>Weekly</MenuItem>
                  <MenuItem value={"monthly"}>Monthly</MenuItem>
                </Select>
              </FormControl>
              <Box textAlign="center">
                <Button
                  variant="contained"
                  color="primary"
                  type="submit"
                  style={{ marginTop: 20 }}
                >
                  Save goal
                </Button>
              </Box>
            </Grid>
        </Paper>
      </form>
      <Snackbar open={showError} autoHideDuration={6000} onClose={handleClose}>
        <Alert onClose={handleClose} severity="warning" className={classes.alert}>{error}</Alert>
      </Snackbar>
    </Grid>
  );
};

export default EditGoal;
