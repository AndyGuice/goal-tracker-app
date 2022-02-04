import React, { useState, useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import {
  Button,
  Container,
  Paper,
  Grid,
  TextField,
  Typography,
} from '@mui/material';
// import { useHistory } from 'react-router-dom';
import { GoogleLogin } from 'react-google-login';
import { signin } from '../../store/actions/auth';
import useStyles from './styles';
import { AUTH, ERROR } from '../../store/actionTypes/actionTypes';
import ErrorDialog from '../Shared/ErrorDialog/ErrorDialog';
import GoogleIcon from '../../helpers/GoogleIcon';

const initialState = {
  firstName: '',
  lastName: '',
  email: '',
  password: '',
  confirmPassword: ''
};

const LoginUser = () => {
  const { error } = useSelector((state: any) => state.error);
  const [form, setForm] = useState(initialState);
  const dispatch = useDispatch();
  // const history = useHistory();
  const classes = useStyles();
  const [submitError, setSubmitError] = useState('');
  const [openErrorDialog, setOpenErrorDialog] = useState(false);

  // const [showPassword, setShowPassword] = useState(false); // TODO: add this handling again

  useEffect(() => {
    if (error) {
      setSubmitError(error);
      setOpenErrorDialog(true);
      dispatch({ type: ERROR, data: null });
    }
    // eslint-disable-next-line
  }, [error]);

  const handleSubmit = (
    e: any
  ) => {
    e.preventDefault();
    dispatch(signin(form, history));
  };

  const googleSuccess = (res: any) => {
    const { profileObj, tokenId } = res;

    const result = profileObj;
    const token = tokenId;

    try {
      dispatch({ type: AUTH, data: { result, token } });

      // history.push('/dashboard');
    } catch (error) {
      console.log(error);
    }
  };

  const handleDialogClose = () => {
    setOpenErrorDialog(false);
  };

  const googleError = () => console.log('Unable to sign in via Google at this time. Please try again later');

  const handleChange = (e: any) => setForm({ ...form, [e.target.name]: e.target.value });

  return (
    <Container component="main" maxWidth="xs">
      <ErrorDialog
        open={openErrorDialog}
        onClose={handleDialogClose}
        error={submitError}
        action="Login"
      />
      <Paper className={classes.paper} elevation={6}>
        <Typography
          component="h1"
          variant="h5"
        >
          Sign in
        </Typography>
        <form className={classes.form} onSubmit={handleSubmit}>
            <TextField
              name="email"
              label="Email Address"
              onChange={handleChange}
              type="email"
              fullWidth
              sx={{
                marginBottom: 2
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
              marginTop: 2
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
                  marginTop: 2
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
                // onClick={() => history.push('/register')}
                color="primary"
                sx={{
                  marginTop: 2
                }}
              >
                Don't have an account? Sign Up
              </Button>
            </Grid>
          </Grid>
        </form>
      </Paper>
    </Container>
  );
};

export default LoginUser;
