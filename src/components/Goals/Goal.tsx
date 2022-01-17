import React, { useState } from 'react';
import {
  Card,
  CardActions,
  CardContent,
  FormControlLabel,
  Grid,
  IconButton,
  Switch,
  Typography
} from '@material-ui/core';
import { useHistory } from 'react-router-dom';
import useStyles from './styles';
import GoalModel from '../../types/goal';
import DeleteIcon from '@material-ui/icons/Delete';
import EditRoundedIcon from '@material-ui/icons/EditRounded';
import { deleteGoal, updateGoalComplete } from '../../store/actions/goals';
import { useDispatch } from 'react-redux';

interface props {
  goal: GoalModel;
  setupView: Boolean;
}

const Goal = (props: props) => {
  const { goal, setupView } = props;
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

  const [isComplete, setIsComplete] = useState<boolean>(complete)

  const handleSwitchChange = (e: React.SyntheticEvent) => {
    e.preventDefault()
   
    let updatedGoal = goal
    updatedGoal.complete = !complete
    setIsComplete(!complete)

    handleSubmit(updatedGoal)
  }

  const handleSubmit = (goal: GoalModel) => {
    dispatch(updateGoalComplete(goal))
  }

  return (
    <Grid 
      item
      xs={12}
    >
      <Card className={classes.goalContainer} raised>
        <CardContent>
          <Typography
            gutterBottom
            variant="h4"
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
          {setupView &&
            <Typography
              variant="body2"
              color="textSecondary"
              component="p"
              gutterBottom
              noWrap
            >
              Cadence: {cadence}
            </Typography>
          }
          {!setupView &&
            <FormControlLabel
              label="Complete?"
              control={
                <Switch
                  checked={isComplete}
                  onChange={(e: any) => handleSwitchChange(e)}
                />
              }
            />
          }
        </CardContent>
        {setupView &&
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
        }
      </Card>
    </Grid>
  );
};

export default Goal;
