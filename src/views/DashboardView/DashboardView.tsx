import React, { useEffect, useState } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { useNavigate } from 'react-router-dom'
import {
  CircularProgress,
  Grid,
} from '@mui/material'
import { makeStyles } from '@mui/styles'
import { getUserGoals, updateTaskComplete } from '../../store/actions/goals'
import Goals from '../../components/Goals/Goals'
import DatePicker from '../../components/Shared/DatePicker/DatePicker'

const useStyles = makeStyles(() => ({
  root: {
    flexGrow: 1,
  },
  title: {
    display: 'flex',
    textAlign: 'center',
  },
  progressCircle: {
    padding: 10
  },
}))

function DashboardView() {
  const {
    goals,
    isLoading,
  } = useSelector((state: any) => state.goals)

  const today = new Date()
  const [selectedDate, setSelectedDate] = useState(today)
  const [selectedDateStr, setSelectedDateStr] = useState(today.toLocaleDateString())

  const dispatch = useDispatch()
  const navigate = useNavigate()
  const classes = useStyles()

  const profile = localStorage.getItem('profile')!

  const [user] = useState(JSON.parse(profile))

  useEffect(() => {
    const { result } = user || { user: {} }
    const userId = result?.googleId || result?._id

    dispatch(getUserGoals(userId))
  }, [user])

  const handleDateUpdate = (date: any) => {
    setSelectedDate(date)
    setSelectedDateStr(date.toLocaleDateString())
  }

  const handleUpdateGoals = (goal: any) => {
    dispatch(updateTaskComplete(goal, navigate))
  }

  return (
    <Grid
      container
      justifyContent="center"
      className={classes.root}
    >
      {isLoading
        ? (
          <CircularProgress
            size="7em"
            color="primary"
            value={100}
            className={classes.progressCircle}
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
              configView={false}
              date={selectedDateStr}
              onUpdate={(e: any) => handleUpdateGoals(e)}
            />
          </>
        )}
    </Grid>
  )
}

export default DashboardView
