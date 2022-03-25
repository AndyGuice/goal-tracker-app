import React, { useState } from 'react'
import { useDispatch } from 'react-redux'
import { useNavigate } from 'react-router-dom'
import {
  Button,
  Grid,
  TextField,
  Typography,
} from '@mui/material'
import { makeStyles } from '@mui/styles'
import useAuth from '../../hooks/useAuth'
import { createFeedbackMessage } from '../../store/actions/feedback'
import FeedbackModel from '../../types/feedback'

const useStyles = makeStyles((theme: any) => ({
  form: {
    flexGrow: 1,
    display: 'flex',
    justifyContent: 'center',
  },
  header: {
    padding: theme.spacing(2)
  },
  submit: {
    display: 'flex',
    justifyContent: 'center',
    padding: theme.spacing(2)
  }
}))

function FeedbackForm() {
  const classes = useStyles()
  const navigate = useNavigate()
  const dispatch = useDispatch()

  const [message, setMessage] = useState('')

  const { user, userId } = useAuth()

  const handleSubmit = () => {
    const feedback = new FeedbackModel()

    feedback.message = message
    feedback.userID = userId

    dispatch(createFeedbackMessage(feedback, navigate))

    navigate('/dashboard')
  }

  return (
    <Grid container>
      <Grid item xs={12} textAlign="center" className={classes.header}>
        <Typography
          variant="h4"
        >
          Submit Feedback
        </Typography>
      </Grid>
      <Grid item xs={12} className={classes.form}>
        <TextField
          name="feedback-message-input"
          aria-label="Feedback message input box"
          value={message}
          onChange={(e: any) => setMessage(e.target.value)}
          label="Details"
          type="message"
          multiline
          rows={6}
          sx={{
            width: '90%'
          }}
        />
      </Grid>
      <Grid item xs={12} className={classes.submit}>
        <Button
          variant="contained"
          color="primary"
          onClick={handleSubmit}
        >
          Submit
        </Button>
      </Grid>

    </Grid>
  )
}

export default FeedbackForm
