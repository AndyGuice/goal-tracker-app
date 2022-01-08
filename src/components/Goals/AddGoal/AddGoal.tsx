import React, { useEffect, useState } from 'react';
import {
  Button,
  ButtonGroup,
  Checkbox,
  Container,
  FormControlLabel,
  Grid,
  Paper,
  Snackbar,
  TextField,
  Tooltip,
  Typography
} from '@material-ui/core';
import GoalModel from '../../../models/goal';
import { useDispatch, useSelector } from 'react-redux';
import { ERROR } from '../../../constants/actionTypes';
import Alert from '../../Helpers/Alert';
import { useHistory } from 'react-router-dom';
import { createGoal } from '../../../actions/goals';
import useStyles from './styles';

const AddGoal = () => {
  const classes = useStyles();
  const history = useHistory();
  const dispatch = useDispatch();
  const { error } = useSelector((state: any) => state.error);
  const [showError, setShowError] = useState(false);

  const [goalTitle, setGoalTitle] = useState('');
  const [goalDescription, setGoalDescription] = useState('');
  const [goalCadence, setGoalCadence] = useState('');
  const [goalComplete, setGoalComplete] = useState(false);

  const profile = localStorage.getItem('profile')!;
  const [user, setUser] = useState(JSON.parse(profile));

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
    goal.complete = goalComplete;
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
    <Container component="main" style={{ marginTop: "100px" }}>
      <form onSubmit={handleSubmit}>
        <Paper className={classes.paper} elevation={6}>
          <Grid container spacing={3}>
            <Grid item xs={12} sm={10}>
              <Typography component="h2" variant="h5" align="center" gutterBottom>Add Goal</Typography>
              <TextField
                onChange={(e) => { setGoalTitle(e.target.value); }}
                value={goalTitle}
                label="Goal Name"
                placeholder="Enter goal Name"
                fullWidth
              />
              <TextField
                onChange={(e) => { setGoalDescription(e.target.value); }}
                label="Goal Description"
                value={goalDescription}
                placeholder="Enter goal description"
                fullWidth
              />
              <TextField
                onChange={(e) => { setGoalCadence(e.target.value); }}
                label="Goal Cadence"
                value={goalCadence}
                placeholder="Enter goal cadence"
                fullWidth
              />
              <FormControlLabel
                label="Complete?"
                control={
                  <Checkbox
                    onChange={(e) => { setGoalComplete(!goalComplete); }}
                    value={goalComplete}
                    placeholder="Goal complete?"
                  />
                }
              />
              <Grid item xs={12} sm={2} style={{ display: "flex", justifyContent: "center", alignItems: "center" }}>
                <Button type="submit">Submit</Button>
              </Grid>
            </Grid>
          </Grid>
        </Paper>
      </form>
      <Snackbar open={showError} autoHideDuration={6000} onClose={handleClose}>
        <Alert
          onClose={handleClose}
          severity="warning"
          className={classes.alert}
        >
          {error}
        </Alert>
      </Snackbar>
    </Container>
  );
};

export default AddGoal;
