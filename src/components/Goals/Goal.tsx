import React, { useState, useEffect } from 'react';
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
import { parseISO } from 'date-fns';
import { format, utcToZonedTime } from "date-fns-tz";

interface props {
  goal: GoalModel;
  setupView: Boolean;
}

const checkForExistingGoal = (goal: GoalModel) => {
  const { createdOn } = goal
  const parsedTime = parseISO(createdOn)
  const goalCreatedDay = format(parsedTime, 'eeee') 
  const today = format(new Date(), 'eeee')
  console.log('Goal Created: ', goalCreatedDay, ' | Today is: ', today)
}

const Goal = (props: props) => {
  const { goal, setupView } = props;
  const {
    title,
    description,
    cadence,
    complete,
    userId: goalUserID,
    _id: goalID,
    createdOn,
  } = goal;

  const classes = useStyles();
  const history = useHistory();
  const dispatch = useDispatch();

  useEffect(() => {
    checkForExistingGoal(goal)
  }, [goal])

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

    handleSubmit(updatedGoal, history)
  }

  const handleSubmit = (goal: GoalModel, history: any) => {
    dispatch(updateGoalComplete(goal, history))
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
            {loggedUser && 
              Object.keys(loggedUser).length !== 0 && 
                userID === goalUserID &&
              <>
                <IconButton
                  title="Edit goal"
                  aria-label="edit goal"
                  onClick={() => history.push(`/editGoal/${goalID}`)}
                >
                  <EditRoundedIcon fontSize="large" color="secondary" />
                </IconButton>
                <IconButton
                  title="Delete goal"
                  aria-label="delete goal"
                  onClick={() => dispatch(deleteGoal(goalID, history))}
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
