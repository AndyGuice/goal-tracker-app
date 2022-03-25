import React, { useEffect, useState } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { useNavigate } from 'react-router-dom'
import {
  Button,
  CircularProgress,
  Grid,
  Stack,
  Typography,
} from '@mui/material'
import NoteIcon from '@mui/icons-material/Note'
import FeedbackIcon from '@mui/icons-material/Feedback'
import { makeStyles } from '@mui/styles'
import useAuth from '../../hooks/useAuth'
import { getUserGoals } from '../../store/actions/goals'
import GoalsTable from '../../components/GoalsTable/GoalsTable'

const useStyles = makeStyles((theme: any) => ({
  root: {
    flexGrow: 1,
    paddingTop: theme.spacing(1),
    marginTop: theme.spacing(1),
  },
}))

function DashboardView() {
  const {
    goals,
    isLoading,
  } = useSelector((state: any) => state.goals)

  const dispatch = useDispatch()
  const navigate = useNavigate()
  const classes = useStyles()

  const { user, userId } = useAuth()

  useEffect(() => {
    dispatch(getUserGoals(userId))
  }, [user])

  const handleSubmitFeedback = () => {
    navigate('/feedback')
  }

  return (
    isLoading ? (
      <div>
        <CircularProgress
          size="7em"
          color="primary"
          value={100}
        />
      </div>
    ) : (
      <Grid container justifyContent="center" className={classes.root}>
        <Grid item xs={12}>
          <Typography
            align="center"
            variant="h2"
          >
            Dashboard
          </Typography>
        </Grid>
        <Grid item xs={12} sx={{ marginTop: 2 }}>
          <GoalsTable goals={goals} />
        </Grid>
        <Grid item>
          <Stack>
            <Button
              variant="outlined"
              startIcon={<NoteIcon />}
              onClick={() => navigate('/goals')}
              sx={{ margin: 1 }}
            >
              Log an Entry
            </Button>
            <Button
              variant="outlined"
              startIcon={<FeedbackIcon />}
              onClick={() => handleSubmitFeedback()}
              sx={{ margin: 1 }}
            >
              Submit feedback
            </Button>
          </Stack>
        </Grid>
      </Grid>
    )
  )
}

export default DashboardView
