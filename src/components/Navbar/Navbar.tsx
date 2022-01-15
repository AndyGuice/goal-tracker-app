import React, { useEffect, useState } from "react";
import useStyles from './styles';
import { 
    AppBar,
    Button,
    Grid,
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
        <AppBar color="primary">
            <Toolbar>
                <Typography 
                    variant="h6" 
                    className={classes.title} 
                    align="left"
                >
                    <Link
                        to={homePath}
                        style={{ textDecoration: "none", color: "#fff" }}
                    >
                        Goal Tracker
                    </Link>
                </Typography>
                {user?.result ?
                    <>
                        <Grid item xs={8} style={{ display: 'flex' }}>
                            <Link to="/dashboard" style={{ textDecoration: 'none', padding: 10 }}>
                                <Button
                                    color="secondary"
                                    variant="contained"
                                >
                                    Dashboard
                                </Button>
                            </Link>
                            <Link to="/setup" style={{ textDecoration: 'none', padding: 10 }}>
                                <Button
                                    color="secondary"
                                    variant="contained"
                                >
                                    Setup    
                                </Button>
                            </Link>
                        </Grid>
                        <div style={{ display: "flex" }}>
                            <Avatar
                                className={classes.purple}
                                alt={user?.result.name}
                                src={user?.result.imageUrl}
                            >
                                {user?.result.name.charAt(0)}
                            </Avatar>
                            <Typography
                                className={classes.userName}
                                variant="h6"
                            >
                                {user?.result.name}
                            </Typography>
                            <Button
                                variant="contained"
                                style={{ marginLeft: "20px" }}
                                color="secondary"
                                onClick={logout}
                            >
                                Logout
                            </Button>
                        </div>
                    </>
                    :
                    <Button
                        color="primary"
                        style={{ border: "1px solid black", backgroundColor: "#FFF" }}
                        onClick={handleLogin}
                    >
                        Sign In
                    </Button>
                }
            </Toolbar>
        </AppBar>
    );
};

export default Navbar;