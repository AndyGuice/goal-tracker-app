import React, { useEffect, useState } from "react";
import useStyles from './styles';
import {
  AppBar,
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
import * as actionType from '../../store/actionTypes/actionTypes';
import decode from 'jwt-decode';
import { Avatar } from "@material-ui/core";
import IconButton from '@material-ui/core/IconButton';
import MenuIcon from '@material-ui/icons/Menu';

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
    <div>
      <AppBar
        color="primary"
      >
        <Toolbar>
          <IconButton edge="start" className={classes.menuButton} color="inherit" aria-label="menu">
            <MenuIcon />
          </IconButton>
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
                  to="/goals"
                  style={{
                    textDecoration: 'none',
                  }}>
                  <Button
                    color="secondary"
                    variant="contained"
                  >
                    Goals
                  </Button>
                </Link>
                <Avatar
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
              <Button
                variant="contained"
                color="secondary"
                onClick={logout}
              >
                Logout
              </Button>
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
              >
                Sign In
              </Button>
            </Grid>
          }
        </Toolbar>
      </AppBar>
    </div>
  );
};

export default Navbar;