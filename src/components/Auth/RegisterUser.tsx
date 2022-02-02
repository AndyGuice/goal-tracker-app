import React, { useEffect, useState } from 'react';
import {
    Avatar,
    Button,
    Container,
    Grid,
    Paper,
    TextField,
    Typography
} from '@mui/material';
import { useDispatch, useSelector } from 'react-redux';
import { useHistory } from 'react-router';
import { signup } from '../../store/actions/auth';
import { ERROR } from '../../store/actionTypes/actionTypes';
import LockOutlinedIcon from '@mui/icons-material/LockOutlined';
import useStyles from './styles';
import * as EmailValidator from 'email-validator';
import ErrorDialog from '../Shared/ErrorDialog/ErrorDialog';

const initialState = { firstName: '', lastName: '', email: '', password: '', confirmPassword: '' };

const RegisterUser = () => {
    const { error } = useSelector((state: any) => state.error);
    const [form, setForm] = useState(initialState);
    const dispatch = useDispatch();
    const history = useHistory();
    const classes = useStyles();
    const [submitError, setSubmitError] = useState('');
    const [openErrorDialog, setOpenErrorDialog] = useState(false);

    // const [showPassword, setShowPassword] = useState(false); // TODO: re-add this handling

    useEffect(() => {
        if (error) {
            setSubmitError(error);
            setOpenErrorDialog(true);
            dispatch({ type: ERROR, data: null });
        }
    }, [error]);

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

    const handleDialogClose = () => {
        setOpenErrorDialog(false);
      };

    return (
        <Container component="main" maxWidth="xs">
            <ErrorDialog
                open={openErrorDialog}
                onClose={handleDialogClose}
                error={submitError}
                action="Registration"
            />
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
                            >
                                Already have an account? Sign in
                            </Button>
                        </Grid>
                    </Grid>
                </form>
            </Paper>
        </Container>
    );
};

export default RegisterUser;


