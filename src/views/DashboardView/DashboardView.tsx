import React, { useEffect, useState } from 'react'
import { useDispatch } from 'react-redux'
import { useNavigate } from 'react-router-dom'
import {
  Button,
  Grid,
  Stack,
  Typography,
} from '@mui/material'
import NoteIcon from '@mui/icons-material/Note'
import FeedbackIcon from '@mui/icons-material/Feedback'
import { makeStyles } from '@mui/styles'
import { getUserGoals } from '../../store/actions/goals'

const useStyles = makeStyles((theme: any) => ({
  root: {
    flexGrow: 1,
    display: 'flex',
    flexDirection: 'column',
    justifyContent: 'center',
    paddingTop: theme.spacing(1),
    marginTop: theme.spacing(1)
  },
}))

function DashboardView() {
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

  const handleSubmitFeedback = () => {
    navigate('/feedback')
  }

  return (
    <Grid container className={classes.root}>
      <Grid item xs={12}>
        <Typography
          align="center"
          variant="h2"
        >
          Dashboard
        </Typography>
      </Grid>
      <Grid item xs={12}>
        <Stack>
          <Button
            variant="outlined"
            startIcon={<NoteIcon />}
            onClick={() => navigate('/goals')}
            sx={{ margin: 2 }}
          >
            Log an Entry
          </Button>
          <Button
            variant="outlined"
            startIcon={<FeedbackIcon />}
            onClick={() => handleSubmitFeedback()}
            sx={{ margin: 2 }}
          >
            Submit feedback
          </Button>
        </Stack>
      </Grid>
    </Grid>
  )
}

export default DashboardView
