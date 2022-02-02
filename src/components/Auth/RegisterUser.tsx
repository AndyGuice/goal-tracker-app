import React, { useEffect, useState } from 'react';
import {
    Avatar,
    Button,
    Container,
    Grid,
    Paper,
    Snackbar,
    TextField,
    Typography
} from '@mui/material';
import Alert from '../../helpers/Alert';
import { useDispatch, useSelector } from 'react-redux';
import { useHistory } from 'react-router';
import { signup } from '../../store/actions/auth';
import { ERROR } from '../../store/actionTypes/actionTypes';
import LockOutlinedIcon from '@mui/icons-material/LockOutlined';
import useStyles from './styles';
import * as EmailValidator from 'email-validator';

const initialState = { firstName: '', lastName: '', email: '', password: '', confirmPassword: '' };

const RegisterUser = () => {
    const { error } = useSelector((state: any) => state.error);
    const [form, setForm] = useState(initialState);
    const dispatch = useDispatch();
    const history = useHistory();
    const classes = useStyles();
    const [showPassword, setShowPassword] = useState(false);
    const [showError, setShowError] = useState(false);


    useEffect(() => {
        if (error) {
            setShowError(true);
        }
    }, [error]);

    const handleClose = (event?: React.SyntheticEvent, reason?: string) => {
        if (reason === 'clickaway') {
            return;
        }
        dispatch({ type: ERROR, data: null });
        setShowError(false);
    };

    const handleSubmit = (e: any) => {
        e.preventDefault();

        if (form.password !== form.confirmPassword) {
            return dispatch({ type: ERROR, data: { error: "Passwords are not equal" } });
        }

        if (!EmailValidator.validate(form.email)) {
            return dispatch({ type: ERROR, data: { error: "Wrong email format" } });
        }

        dispatch(signup(form, history));
    };

    const handleChange = (e: any) => setForm({ ...form, [e.target.name]: e.target.value });

    return (
        <Container component="main" maxWidth="xs" style={{ marginTop: "80px" }}>
            <Paper className={classes.paper} elevation={6}>
                <Avatar className={classes.avatar}>
                    <LockOutlinedIcon />
                </Avatar>
                <Typography component="h1" variant="h5">Sign up</Typography>
                <form className={classes.form} onSubmit={handleSubmit}>
                    <Grid container spacing={2} justifyContent="center">
                        <TextField
                            name="firstName"
                            label="First Name"
                            onChange={handleChange}
                            autoFocus
                            sx={{
                                width: "80%",
                                marginTop: 2,
                                marginBottom: 2
                            }}
                        />
                        <TextField
                            name="lastName"
                            label="Last Name"
                            onChange={handleChange}
                            sx={{
                                width: "80%",
                                marginBottom: 2
                            }}
                        />
                        <TextField
                            name="email"
                            label="Email Address"
                            onChange={handleChange}
                            type="email"
                            sx={{
                                width: "80%",
                                marginBottom: 2
                            }}
                        />
                        <TextField
                            name="password"
                            label="Password"
                            onChange={handleChange}
                            type="password"
                            sx={{
                                width: "80%",
                                marginBottom: 2
                            }}
                        />
                        <TextField
                            name="confirmPassword"
                            label="Repeat Password"
                            onChange={handleChange}
                            type="password"
                            sx={{
                                width: "80%",
                                marginBottom: 4
                            }}
                        />
                    </Grid>
                    <Button
                        type="submit"
                        fullWidth
                        variant="contained"
                        color="primary"
                        sx={{
                            marginBottom: 2
                        }}
                    >
                        Sign Up
                    </Button>
                    <Grid container>
                        <Grid item>
                            <Button
                                onClick={() => history.push('/loginUser')}
                                color="primary"
                                sx={{
                                    marginBottom: 2
                                }}
                            >
                                Already have an account? Sign in
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
                    {error}
                </Alert>
            </Snackbar>
        </Container>
    );
};

export default RegisterUser;


