import React, { useEffect, useState } from 'react'
import { useNavigate, useParams } from 'react-router-dom'
import { useDispatch, useSelector } from 'react-redux'
import {
  Box,
  Button,
  CircularProgress,
  Grid,
  Paper,
  TextField,
  Typography,
} from '@mui/material'
import { makeStyles } from '@mui/styles'
import GoalModel from '../../types/goal'
import { ERROR } from '../../store/actionTypes/actionTypes'
import { getGoal, updateGoal } from '../../store/actions/goals'
import useAuth from '../../hooks/useAuth'
import ErrorDialog from '../Shared/ErrorDialog/ErrorDialog'

const useStyles = makeStyles((theme: any) => ({
  paper: {
    display: 'flex',
    alignItems: 'center',
    flexDirection: 'column',
    marginTop: theme.spacing(1),
    padding: theme.spacing(2),
    [theme.breakpoints.down('sm')]: {
      display: 'flex',
      alignItems: 'center',
      flexDirection: 'column',
      width: '100%',
    }
  },
}))

export function EditGoal() {
  const { id } = useParams<any>()
  const navigate = useNavigate()
  const dispatch = useDispatch()
  const classes = useStyles()
  const { user } = useAuth()

  const { goal, isLoading } = useSelector((state: any) => state.goals)
  const { error } = useSelector((state: any) => state.error)

  const { title, description, tasks } = goal || { title: '', description: '', tasks: [] }

  const [goalTitle, setGoalTitle] = useState(title)
  const [goalDescription, setGoalDescription] = useState(description)

  const [submitError, setSubmitError] = useState('')
  const [openErrorDialog, setOpenErrorDialog] = useState(false)

  useEffect(() => {
    dispatch(getGoal(id))
  }, [id])

  useEffect(() => {
    setGoalTitle(title)
    setGoalDescription(description)
  }, [description, title])

  useEffect(() => {
    if (error) {
      setSubmitError(error)
      setOpenErrorDialog(true)
      dispatch({ type: ERROR, data: null })
    }
  }, [error])

  const validateGoal = (goalToValidate: GoalModel) => {
    if (goalToValidate.title.trim().length === 0) {
      return { ok: false, error: 'No goal name' }
    }
    return { ok: true }
  }

  const handleSubmit = (event: React.SyntheticEvent) => {
    event.preventDefault()
    const newGoal = new GoalModel()

    newGoal.title = goalTitle.trim()
    newGoal.description = goalDescription.trim()
    newGoal.userId = user.result._id
    newGoal._id = id || ''
    newGoal.updatedOn = new Date().toISOString()
    newGoal.tasks = tasks

    const goalResult = validateGoal(newGoal)
    if (!goalResult.ok) {
      return dispatch({ type: ERROR, data: { error: goalResult.error } })
    }

    dispatch(updateGoal(newGoal, navigate))
  }

  const handleDialogClose = () => {
    setOpenErrorDialog(false)
  }

  if (isLoading) {
    return (
      <Grid
        container
        style={{ marginTop: '100px' }}
      >
        <Paper
          elevation={6}
          style={{ marginTop: '80px' }}
        >
          <CircularProgress size="7em" color="secondary" />
        </Paper>
      </Grid>
    )
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
        action="Edit goal...?"
      />
      <form onSubmit={handleSubmit}>
        <Paper
          elevation={6}
          className={classes.paper}
        >
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
              onChange={(e) => { setGoalTitle(e.target.value) }}
              value={goalTitle}
              placeholder="Goal name"
              fullWidth
              sx={{
                marginTop: 2,
                marginBottom: 2,
              }}
            />
            <TextField
              id="goal-description-input"
              label="Goal Description"
              onChange={(e) => { setGoalDescription(e.target.value) }}
              value={goalDescription}
              placeholder="Goal description"
              fullWidth
              sx={{
                marginBottom: 2,
              }}
            />
            <Box textAlign="center">
              <Button
                variant="contained"
                color="warning"
                onClick={() => navigate('/goals')}
                sx={{
                  margin: 2,
                  width: 100
                }}
              >
                Cancel
              </Button>
              <Button
                variant="contained"
                color="primary"
                type="submit"
                sx={{
                  margin: 2,
                  width: 100
                }}
              >
                Save
              </Button>
            </Box>
          </Grid>
        </Paper>
      </form>
    </Grid>
  )
}

export default EditGoal
