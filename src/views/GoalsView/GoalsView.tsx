import React, { useEffect, useState } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { useNavigate } from 'react-router-dom'
import {
  CircularProgress,
  FormControlLabel,
  FormGroup,
  IconButton,
  Grid,
  Switch,
  Tooltip,
} from '@mui/material'
import EditIcon from '@mui/icons-material/Edit'
import NoteAddIcon from '@mui/icons-material/NoteAdd'
import { makeStyles } from '@mui/styles'
import {
  getUserGoals,
  updateTaskComplete,
} from '../../store/actions/goals'
import { ERROR } from '../../store/actionTypes/actionTypes'
import Goals from '../../components/Goals/Goals'
import ErrorDialog from '../../components/Shared/ErrorDialog/ErrorDialog'
import DatePicker from '../../components/Shared/DatePicker/DatePicker'

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

  const today = new Date()
  const [selectedDate, setSelectedDate] = useState(today)
  const [selectedDateStr, setSelectedDateStr] = useState(today.toLocaleDateString())

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

  const handleDialogClose = () => {
    setOpenErrorDialog(false)
  }

  const handleDateUpdate = (date: any) => {
    setSelectedDate(date)
    setSelectedDateStr(date.toLocaleDateString())
  }

  const handleUpdateTask = (goal: any) => {
    dispatch(updateTaskComplete(goal, navigate))
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
                    id="Add goal button"
                    aria-label="Add goal button"
                    color="primary"
                    onClick={() => navigate('/addGoal')}
                  >
                    <NoteAddIcon />
                  </IconButton>
                </Tooltip>
              )}
            <Tooltip title="Edit View">
              <FormGroup>
                <FormControlLabel
                  control={<Switch />}
                  label="Edit"
                  onChange={() => setEditView(!editView)}
                />
              </FormGroup>
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
          <>
            <DatePicker
              date={selectedDate}
              onChange={(e: any) => handleDateUpdate(e)}
            />
            <Goals
              goals={goals}
              configView={editView}
              date={selectedDateStr}
              onUpdate={(e: any) => handleUpdateTask(e)}
            />
          </>
        )}
    </Grid>
  )
}

export default GoalsView
