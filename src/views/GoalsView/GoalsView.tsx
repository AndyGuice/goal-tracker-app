import React, { useEffect, useState } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import {
  Backdrop,
  CircularProgress,
  Grid,
} from '@mui/material'
import { makeStyles } from '@mui/styles'
import { getUserGoals } from '../../store/actions/goals'
import { ERROR } from '../../store/actionTypes/actionTypes'
import Goals from '../../components/Goals/Goals'
import ErrorDialog from '../../components/Shared/ErrorDialog/ErrorDialog'
import DatePicker from '../../components/Shared/DatePicker/DatePicker'
import ActionSpeedDial from '../../components/SpeedDial/SpeedDial'

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

  const dispatch = useDispatch()
  const classes = useStyles()

  const profile = localStorage.getItem('profile')!

  const [submitError, setSubmitError] = useState('')
  const [openErrorDialog, setOpenErrorDialog] = useState(false)
  const [openSpeedDial, setOpenSpeedDial] = useState(false)

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
      <Backdrop open={openSpeedDial} />
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
              today={today}
              onChange={(e: any) => handleDateUpdate(e)}
            />
            <Goals
              goals={goals}
              date={selectedDateStr}
            />
          </>
        )}
      <ActionSpeedDial
        open={openSpeedDial}
        onOpen={() => setOpenSpeedDial(true)}
        onClose={() => setOpenSpeedDial(false)}
      />
    </Grid>
  )
}

export default GoalsView
