import React, { useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { 
  Avatar,
  Button,
  Container,
  Paper,
  Grid,
  Typography,
} from '@material-ui/core';
import { useHistory } from 'react-router-dom';
import { GoogleLogin } from 'react-google-login';
import LockOutlinedIcon from '@material-ui/icons/LockOutlined';
import { signin } from '../../store/actions/auth';
import GoogleIcon from '../Helpers/GoogleIcon';
import useStyles from './styles';
import Input from '../Helpers/Input';
import { AUTH, ERROR } from '../../constants/actionTypes';
import Snackbar from '@material-ui/core/Snackbar';
import { useEffect } from 'react';
import Alert from '../Helpers/Alert';
import ErrorDialog from '../ErrorDialog/ErrorDialog'

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
  const history = useHistory();
  const classes = useStyles();
  const [showPassword, setShowPassword] = useState(false);
  const [showError, setShowError] = useState(false);
  const [openErrorDialog, setOpenErrorDialog] = useState(false);

  useEffect(() => {
    if (error) {
      setShowError(true);
      setOpenErrorDialog(true);
      dispatch({ type: ERROR, data: null });
    }
  // eslint-disable-next-line
  }, [error]);

  const handleClose = (event?: React.SyntheticEvent, reason?: string) => {
    if (reason === 'clickaway') {
      return;
    }
    setShowError(false);
  };


  const handleSubmit = (
    e: any
    ) => {
    e.preventDefault();
    dispatch(signin(form, history));
  };

  const googleSuccess = async (res: any) => {
    const result = res?.profileObj;
    const token = res?.tokenId;

    try {
      dispatch({ type: AUTH, data: { result, token } });

      history.push('/');
    } catch (error) {
      console.log(error);
    }
  };

  const googleError = () => console.log('Google Sign In was unsuccessful. Try again later');

  const handleChange = (e: any) => setForm({ ...form, [e.target.name]: e.target.value });

  return (
    <Container component="main" maxWidth="xs" style={{ marginTop: "80px" }}>
      <ErrorDialog
        open={openErrorDialog}
        error={error}
      />
      <Paper className={classes.paper} elevation={6}>
        <Avatar className={classes.avatar}>
          <LockOutlinedIcon />
        </Avatar>
        <Typography component="h1" variant="h5">Sign in</Typography>
        <form className={classes.form} onSubmit={handleSubmit}>
          <Grid container spacing={2}>
            <Input
              name="email"
              label="Email Address"
              handleChange={handleChange}
              type="email"
            />
            <Input
              name="password"
              label="Password"
              handleChange={handleChange}
              type={showPassword ? 'text' : 'password'}
              handleShowPassword={() => setShowPassword(!showPassword)}
            />
          </Grid>
          <Button
            fullWidth
            variant="contained"
            color="primary"
            // className={classes.submit}
            onClick={(e) => handleSubmit(e)}
            // onClick={() => dispatch(signin(form, history))}
          >
            Sign In
          </Button>
          <GoogleLogin
            clientId={process.env.REACT_APP_GOOGLE_OAUTH_CLIENT_ID}
            render={(renderProps) => (
              <Button
                className={classes.googleButton}
                color="primary"
                fullWidth
                onClick={renderProps.onClick}
                disabled={renderProps.disabled}
                startIcon={<GoogleIcon />}
                variant="contained">
                Google Sign In
              </Button>
            )}
            onSuccess={googleSuccess}
            onFailure={googleError}
            cookiePolicy="single_host_origin"
          />
          <Grid container justify="flex-end">
            <Grid item>
              <Button
                onClick={() => history.push('/register')}
                color="primary"
              >
                Don't have an account? Sign Up
              </Button>
            </Grid>
          </Grid>
        </form>
      </Paper>
      <Snackbar open={showError} autoHideDuration={6000} onClose={handleClose}>
        <Alert
          onClose={handleClose}
          severity="info"
          className={classes.alert}
        >
          Invalid Credentials
        </Alert>
      </Snackbar>
    </Container>
  );
};

export default LoginUser;
