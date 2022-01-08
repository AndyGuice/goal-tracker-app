import React, { useEffect, useState } from 'react';
import {
  Card,
  CardActions,
  CardContent,
  Checkbox,
  FormControlLabel,
  Grid,
  IconButton,
  Typography
} from '@material-ui/core';
import { useHistory } from 'react-router-dom';
import useStyles from './styles';
import GoalModel from '../../models/goal';
import DeleteIcon from '@material-ui/icons/Delete';
import EditRoundedIcon from '@material-ui/icons/EditRounded';
import { deleteGoal } from '../../actions/goals';
import { useDispatch } from 'react-redux';

interface props {
  goal: GoalModel;
}

const Goal = (props: props) => {
  const { goal } = props;
  const {
    title,
    description,
    cadence,
    complete,
    userId: goalUserID,
  } = goal;

  const classes = useStyles();
  const history = useHistory();
  const dispatch = useDispatch();

  const profile = localStorage.getItem('profile')!;
  const loggedUser = JSON.parse(profile);
  const { result } = loggedUser || { result: {} };
  const { googleId, _id } = result || { googleId: {}, _id: {} };
  const userID = googleId || _id;

  console.log("UserID: ", userID);

  return (
    <Grid item xs={12} md={6} lg={3} style={{ marginTop: "10px" }}>
      <Card className={classes.root} raised>
        <CardContent>
          <Typography
            gutterBottom
            variant="h5"
            component="h2"
            noWrap
          >
            {title}
          </Typography>
          <Typography
            variant="body2"
            color="textSecondary"
            component="p"
            gutterBottom
            noWrap
          >
            Description: {description}
          </Typography>
          <Typography
            variant="body2"
            color="textSecondary"
            component="p"
            gutterBottom
            noWrap
          >
            Cadence: {cadence}
          </Typography>
          <FormControlLabel
            label="Complete?"
            control={
              <Checkbox
                disabled
                value={complete}
                placeholder="Goal complete?"
              />
            }
          />
        </CardContent>
        <CardActions>
          {loggedUser && Object.keys(loggedUser).length !== 0 && userID === goalUserID &&
            <>
              <IconButton
                title="Edit goal"
                aria-label="edit goal"
                onClick={() => history.push(`/editGoal/${props.goal._id}`)}
              >
                <EditRoundedIcon fontSize="large" color="secondary" />
              </IconButton>
              <IconButton
                title="Delete goal"
                aria-label="delete goal"
                onClick={() => dispatch(deleteGoal(props.goal._id, history))}
              >
                <DeleteIcon fontSize="large" color="secondary" />
              </IconButton>
            </>
          }
        </CardActions>
      </Card>
    </Grid>
  );
};

export default Goal;
