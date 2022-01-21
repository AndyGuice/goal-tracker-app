import React, { useEffect, useState } from "react";
import useStyles from './styles';
import {
    AppBar,
    Box,
    Button,
    Grid,
    Hidden,
    Toolbar,
    Typography
} from "@material-ui/core";
import {
    Link,
    useHistory,
    useLocation
} from 'react-router-dom';
import { useDispatch } from 'react-redux';
import * as actionType from '../../constants/actionTypes';
import decode from 'jwt-decode';
import { Avatar } from "@material-ui/core";

const Navbar = () => {
    const classes = useStyles();
    const history = useHistory();
    const location = useLocation();
    const profile = localStorage.getItem('profile')!;

    const [user, setUser] = useState(JSON.parse(profile));

    const handleLogin = () => history.push('/loginUser');
    const dispatch = useDispatch();

    const logout = () => {
        dispatch({ type: actionType.LOGOUT });
        history.push('/');
        setUser(null);
    };

    const homePath = (user ? "/dashboard" : "/");

    useEffect(() => {
        const token = user?.token;

        if (token) {
            const decodedToken = decode<any>(token);
            if (decodedToken.exp * 1000 < new Date().getTime()) logout();
        }

        setUser(JSON.parse(profile));

        // eslint-disable-next-line
    }, [location]);

    return (
        <Grid
            container
        // className={classes.container}
        >
            <AppBar
                color="primary"
            // position="static"
            >
                <Toolbar>
                    <Grid item xs={10}>
                        <Typography
                            variant="h6"
                            className={classes.title}
                            align="left"
                        >
                            <Link
                                to={homePath}
                                style={{
                                    textDecoration: "none",
                                    color: "#fff"
                                }}
                            >
                                Goal Tracker
                            </Link>
                        </Typography>
                    </Grid>
                    {user?.result ?
                        <>
                            <Hidden xsDown>
                                <Link
                                    to="/dashboard"
                                    style={{
                                        textDecoration: 'none',
                                    }}>
                                    <Button
                                        color="secondary"
                                        variant="contained"
                                    >
                                        Dashboard
                                    </Button>
                                </Link>
                                <Link
                                    to="/setup"
                                    style={{
                                        textDecoration: 'none',
                                    }}>
                                    <Button
                                        color="secondary"
                                        variant="contained"
                                    >
                                        Setup
                                    </Button>
                                </Link>
                                <Avatar
                                    className={classes.purple}
                                    alt={user?.result.name}
                                    src={user?.result.imageUrl}
                                >
                                    {user?.result.name.charAt(0)}
                                </Avatar>
                                <Typography
                                    variant="h6"
                                >
                                    {user?.result.name}
                                </Typography>
                            </Hidden>
                            <Grid
                                item xs={2}
                                style={{ display: 'flex', justifyContent: 'flex-end' }}
                            >
                                <Button
                                    variant="contained"
                                    color="secondary"
                                    onClick={logout}
                                    className={classes.button}
                                >
                                    Logout
                                </Button>
                            </Grid>
                        </>
                        :
                        <Grid
                            item xs={2}
                            style={{ display: 'flex', justifyContent: 'flex-end' }}
                        >
                            <Button
                                color="secondary"
                                variant="contained"
                                onClick={handleLogin}
                                className={classes.button}
                            >
                                Sign In
                            </Button>
                        </Grid>
                    }
                </Toolbar>
            </AppBar>
        </Grid>
    );
};

export default Navbar;