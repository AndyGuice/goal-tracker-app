import React, { useEffect, useState } from 'react';
import {
  Box,
  Button,
  Checkbox,
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
import GoalModel from '../../../types/goal';
import { useDispatch, useSelector } from 'react-redux';
import { ERROR } from '../../../constants/actionTypes';
import Alert from '../../../helpers/Alert';
import { useHistory } from 'react-router-dom';
import { createGoal } from '../../../store/actions/goals';
import useStyles from './styles';

const AddGoal = () => {
  const classes = useStyles();
  const history = useHistory();
  const dispatch = useDispatch();
  const { error } = useSelector((state: any) => state.error);
  const [showError, setShowError] = useState(false);

  const [goalTitle, setGoalTitle] = useState('');
  const [goalDescription, setGoalDescription] = useState('');
  const [goalCadence, setGoalCadence] = useState('daily');

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

  const handleSubmit = (event: React.SyntheticEvent) => {
    event.preventDefault();

    const { result } = user;
    const { googleId } = result;

    const goal = new GoalModel();

    goal.title = goalTitle.trim();
    goal.description = goalDescription.trim();
    goal.cadence = goalCadence;
    goal.complete = false
    goal.userId = googleId || result._id;

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
    if (goal.description.trim().length === 0) {
      return { ok: false, error: "No goal description" };
    }
    return { ok: true };
  };

  const handleClose = (event?: React.SyntheticEvent, reason?: string) => {
    if (reason === 'clickaway') {
      return;
    }

    dispatch({ type: ERROR, data: null });
    setShowError(false);
  };

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
                component="h2" 
                variant="h5" 
                align="center" 
                gutterBottom
              >
                Add Goal
              </Typography>
              <TextField
                onChange={(e) => { setGoalTitle(e.target.value); }}
                value={goalTitle}
                label="Goal Name"
                placeholder="Enter goal name"
                fullWidth
              />
              <TextField
                onChange={(e) => { setGoalDescription(e.target.value); }}
                label="Goal Description"
                value={goalDescription}
                placeholder="Enter goal description"
                fullWidth
              />
              <FormControl fullWidth>
                <InputLabel id="goal-cadence-select-label">Cadence</InputLabel>
                <Select
                  labelId="goal-cadence-select-label"
                  id="goal-cadence-select"
                  value={goalCadence}
                  label="Goal Cadence"
                  onChange={(e: any) => setGoalCadence(e.target.value)}
                >
                  <MenuItem value={"daily"}>Daily</MenuItem>
                  <MenuItem value={"weekly"}>Weekly</MenuItem>
                  <MenuItem value={"monthly"}>Monthly</MenuItem>
                </Select>
              </FormControl>
              <Box textAlign="center">
                <Button 
                  type="submit"
                  variant="outlined"
                  color="primary"
                  style={{ margin: 10, marginTop: 20 }}
                >
                  Submit
                </Button>
              </Box>
            </Grid>
        </Paper>
      </form>
      <Snackbar 
        open={showError}
        autoHideDuration={6000}
        onClose={handleClose}
      >
        <Alert
          onClose={handleClose}
          severity="warning"
          className={classes.alert}
        >
          {error}
        </Alert>
      </Snackbar>
    </Grid>
  );
};

export default AddGoal;
