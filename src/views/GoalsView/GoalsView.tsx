import React, { useEffect, useState } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { useNavigate } from 'react-router-dom'
import {
  CircularProgress,
  IconButton,
  Grid,
  Tooltip,
} from '@mui/material'
import EditIcon from '@mui/icons-material/Edit'
import NoteAddIcon from '@mui/icons-material/NoteAdd'
import { makeStyles } from '@mui/styles'
import {
  getUserGoals,
  updateGoal,
} from '../../store/actions/goals'
import { ERROR } from '../../store/actionTypes/actionTypes'
import Goals from '../../components/Goals/Goals'
import ErrorDialog from '../../components/Shared/ErrorDialog/ErrorDialog'

const useStyles = makeStyles((theme: any) => ({
  root: {
    flexGrow: 1,
    padding: theme.spacing(1),
    backgroundColor: '#DDD'
  },
  actionButtons: {
    display: 'flex',
    justifyContent: 'flex-end',
    margin: theme.spacing(2),
    padding: theme.spacing(1)
  }
}))

function GoalsView() {
  const { error } = useSelector((state: any) => state.error)
  const {
    goals,
    isLoading,
  } = useSelector((state: any) => state.goals)

  const navigate = useNavigate()
  const dispatch = useDispatch()
  const classes = useStyles()

  const profile = localStorage.getItem('profile')!

  const [submitError, setSubmitError] = useState('')
  const [openErrorDialog, setOpenErrorDialog] = useState(false)
  const [editView, setEditView] = useState(false)

  const [
    user,
  ] = useState(JSON.parse(profile))

  useEffect(() => {
    if (error) {
      setSubmitError(error)
      setOpenErrorDialog(true)
      dispatch({ type: ERROR, data: null })
    }
  }, [error])

  useEffect(() => {
    const { result } = user || { user: {} }
    const userId = result?.googleId || result?._id

    dispatch(getUserGoals(userId))
  }, [user])

  const handleUpdateGoal = (goal: any) => {
    dispatch(updateGoal(goal, navigate))
  }

  const handleDialogClose = () => {
    setOpenErrorDialog(false)
  }

  return (
    <Grid
      container
      justifyContent="center"
      className={classes.root}
    >
      <ErrorDialog
        open={openErrorDialog}
        onClose={handleDialogClose}
        error={submitError}
        action="Login"
      />
      {user?.result
        && (
          <Grid item xs={12} className={classes.actionButtons}>
            {editView
              && (
                <Tooltip title="Add goal">
                  <IconButton
                    color="primary"
                    onClick={() => navigate('/addGoal')}
                  >
                    <NoteAddIcon />
                  </IconButton>
                </Tooltip>
              )}
            <Tooltip title="Edit goals">
              <IconButton
                color="primary"
                onClick={() => setEditView(!editView)}
              >
                <EditIcon />
              </IconButton>
            </Tooltip>
          </Grid>
        )}
      {isLoading
        ? (
          <CircularProgress
            size="7em"
            color="primary"
            value={100}
          />
        )
        : (
          <Goals
            goals={goals}
            configView={editView}
            onUpdate={handleUpdateGoal}
          />
        )}
    </Grid>
  )
}

export default GoalsView
