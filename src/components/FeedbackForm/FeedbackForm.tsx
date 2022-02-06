import React from 'react'
import { useNavigate } from 'react-router-dom'
import {
  Button,
  Grid,
  TextField,
  Typography,
} from '@mui/material'
import { makeStyles } from '@mui/styles'

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

  const handleSubmit = () => {
    console.log('Submitting...')
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
