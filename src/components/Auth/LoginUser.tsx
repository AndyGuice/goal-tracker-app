import React, { useState, useEffect } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { useNavigate } from 'react-router-dom'
import {
  Button,
  Container,
  Paper,
  Grid,
  TextField,
  Typography,
} from '@mui/material'
import { GoogleLogin } from 'react-google-login'
import { makeStyles } from '@mui/styles'
import { signIn } from '../../store/actions/auth'
import { ERROR } from '../../store/actionTypes/actionTypes'
import ErrorDialog from '../Shared/ErrorDialog/ErrorDialog'
import GoogleIcon from '../../helpers/GoogleIcon'

const useStyles = makeStyles((theme: any) => ({
  paper: {
    display: 'flex',
    flexDirection: 'column',
    alignItems: 'center',
    padding: theme.spacing(2),
    marginTop: theme.spacing(3)
  },
  form: {
    width: '100%',
    marginTop: theme.spacing(3),
  },
}))

const initialState = {
  email: '',
  password: '',
}

function LoginUser() {
  const { error } = useSelector((state: any) => state.error)
  const [form, setForm] = useState(initialState)
  const [submitError, setSubmitError] = useState('')
  const [openErrorDialog, setOpenErrorDialog] = useState(false)

  const dispatch = useDispatch()
  const navigate = useNavigate()
  const classes = useStyles()

  useEffect(() => {
    if (error) {
      setSubmitError(error)
      setOpenErrorDialog(true)
      dispatch({ type: ERROR, data: null })
    }
  }, [error])

  const handleSubmit = (
    e: any,
  ) => {
    e.preventDefault()
    dispatch(signIn(form, navigate))
  }

  const googleSuccess = (res: any) => {
    const { profileObj } = res

    const result = profileObj
    // const token = tokenId

    try {
      dispatch(signIn(result, navigate))

      navigate('/dashboard')
    } catch (err) {
      dispatch({ type: ERROR, err })
    }
  }

  const handleDialogClose = () => {
    setOpenErrorDialog(false)
  }

  const googleError = () => {
    setSubmitError('Unable to sign in via Google at this time. Please try again later')
    setOpenErrorDialog(true)
  }

  const handleChange = (e: any) => setForm({ ...form, [e.target.name]: e.target.value })

  return (
    <Container component="main" maxWidth="xs">
      <ErrorDialog
        open={openErrorDialog}
        onClose={handleDialogClose}
        error={submitError}
        action="Login"
      />
      <Paper elevation={6} className={classes.paper}>
        <Typography
          component="h1"
          variant="h5"
        >
          Sign in
        </Typography>
        <form onSubmit={handleSubmit} className={classes.form}>
          <TextField
            name="email"
            label="Email Address"
            onChange={handleChange}
            type="email"
            fullWidth
            sx={{
              marginBottom: 2,
            }}
          />
          <TextField
            name="password"
            label="Password"
            onChange={handleChange}
            type="password"
            fullWidth
          />
          <Button
            fullWidth
            variant="contained"
            color="primary"
            onClick={(e) => handleSubmit(e)}
            sx={{
              marginTop: 2,
            }}
          >
            Sign In
          </Button>
          <GoogleLogin
            clientId={process.env.REACT_APP_GOOGLE_OAUTH_CLIENT_ID || ''}
            render={(renderProps) => (
              <Button
                color="primary"
                fullWidth
                onClick={renderProps.onClick}
                disabled={renderProps.disabled}
                variant="contained"
                startIcon={<GoogleIcon />}
                sx={{
                  marginTop: 2,
                }}
              >
                Google Sign In
              </Button>
            )}
            onSuccess={googleSuccess}
            onFailure={googleError}
            cookiePolicy="single_host_origin"
          />
          <Grid container justifyContent="flex-end">
            <Grid item>
              <Button
                onClick={() => navigate('/register')}
                color="primary"
                sx={{
                  marginTop: 2,
                }}
              >
                No account? Sign Up
              </Button>
            </Grid>
          </Grid>
        </form>
      </Paper>
    </Container>
  )
}

export default LoginUser
