import React, { useEffect, useState } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { useNavigate } from 'react-router-dom'
import {
  Box,
  Button,
  Grid,
  Paper,
  TextField,
  Typography,
} from '@mui/material'
import { makeStyles } from '@mui/styles'
import GoalModel from '../../types/goal'
import { ERROR } from '../../store/actionTypes/actionTypes'
import { createGoal } from '../../store/actions/goals'
import ErrorDialog from '../Shared/ErrorDialog/ErrorDialog'

const useStyles = makeStyles((theme: any) => ({
  paper: {
    display: 'flex',
    alignItems: 'center',
    flexDirection: 'column',
    padding: theme.spacing(1),
    margin: theme.spacing(1),
    // width: '75%',
    [theme.breakpoints.down('sm')]: {
      // width: '100%',
    }
  },
}))

function AddGoal() {
  const { error } = useSelector((state: any) => state.error)
  const [goalTitle, setGoalTitle] = useState('')
  const [goalDescription, setGoalDescription] = useState('')
  // const [goalStart, setGoalStart] = useState('');
  // const [goalEnd, setGoalEnd] = useState('');

  const dispatch = useDispatch()
  const navigate = useNavigate()
  const classes = useStyles()

  const profile = localStorage.getItem('profile')!
  const [user] = useState(JSON.parse(profile))

  const [submitError, setSubmitError] = useState('')
  const [openErrorDialog, setOpenErrorDialog] = useState(false)

  useEffect(() => {
    if (error) {
      setSubmitError(error)
      setOpenErrorDialog(true)
      dispatch({ type: ERROR, data: null })
    }
  }, [error])

  const validateGoal = (goal: GoalModel) => {
    if (goal.title.trim().length === 0) {
      return { ok: false, error: 'No goal title' }
    }
    return { ok: true }
  }

  const handleSubmit = (event: React.SyntheticEvent) => {
    event.preventDefault()

    const { result } = user
    const { googleId } = result

    const goal = new GoalModel()
    const today = new Date().toISOString()

    goal.title = goalTitle.trim()
    goal.description = goalDescription.trim()
    goal.userId = googleId || result._id
    goal.createdOn = today
    goal.updatedOn = today
    goal.active = true

    const goalResult = validateGoal(goal)
    if (!goalResult.ok) {
      return dispatch({ type: ERROR, data: { error: goalResult.error } })
    }

    dispatch(createGoal(goal, navigate))
  }

  const handleDialogClose = () => {
    setOpenErrorDialog(false)
  }

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
      <form onSubmit={handleSubmit} className={classes.paper}>
        <Paper
          elevation={6}
          sx={{
            marginTop: 2,
          }}
        >
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
              onChange={(e) => { setGoalTitle(e.target.value) }}
              value={goalTitle}
              label="Goal Name"
              placeholder="Enter goal name"
              fullWidth
              sx={{
                padding: 2,
              }}
            />
            <TextField
              id="goal-description-input"
              onChange={(e) => { setGoalDescription(e.target.value) }}
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
              >
                Submit
              </Button>
            </Box>
          </Grid>
        </Paper>
      </form>
    </Grid>
  )
}

export default AddGoal
