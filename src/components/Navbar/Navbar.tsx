import React, { useState, useEffect } from 'react';
import AppBar from '@mui/material/AppBar';
import Toolbar from '@mui/material/Toolbar';
import IconButton from '@mui/material/IconButton';
// import Badge from '@mui/material/Badge';
import MenuItem from '@mui/material/MenuItem';
import Menu from '@mui/material/Menu';
import MenuIcon from '@mui/icons-material/Menu';
import AccountCircle from '@mui/icons-material/AccountCircle';
import Avatar from '@mui/material/Avatar';
import MailIcon from '@mui/icons-material/Mail';
import NotificationsIcon from '@mui/icons-material/Notifications';
import MoreIcon from '@mui/icons-material/MoreVert';
import Button from '@mui/material/Button';

import {
  useLocation,
  useNavigate
} from 'react-router-dom';
import decode from 'jwt-decode';
import { useDispatch } from 'react-redux';
import useStyles from './styles';
import Drawer from './Drawer';
import * as actionType from '../../store/actionTypes/actionTypes';

export default function Navbar() {
  // TODO: move auth handling to hooks func
  const location = useLocation();
  const dispatch = useDispatch();
  const navigate = useNavigate();

  const profile = localStorage.getItem('profile')!;
  const [user, setUser] = useState(JSON.parse(profile));
  const handleLogin = () => navigate('/loginUser');

  const [anchorEl, setAnchorEl] = React.useState<null | HTMLElement>(null);
  const [mobileMoreAnchorEl, setMobileMoreAnchorEl] = React.useState<null | HTMLElement>(null);

  // const homePath = (user ? "/dashboard" : "/");

  const handleMobileMenuClose = () => {
    setMobileMoreAnchorEl(null);
  };

  const logout = () => {
    dispatch({ type: actionType.LOGOUT });
    navigate('/');
    setUser(null);
    setAnchorEl(null);
    handleMobileMenuClose();
  };

  useEffect(() => {
    const token = user?.token;

    if (token) {
      const decodedToken = decode<any>(token);
      if (decodedToken.exp * 1000 < new Date().getTime()) logout();
    }

    setUser(JSON.parse(profile));

    // eslint-disable-next-line
    }, [location]);
  // end auth handling

  const classes = useStyles();
  const [menuDrawerOpen, setMenuDrawerOpen] = useState(false);

  const isMenuOpen = Boolean(anchorEl);
  const isMobileMenuOpen = Boolean(mobileMoreAnchorEl);

  const handleProfileMenuOpen = (event: React.MouseEvent<HTMLElement>) => {
    setAnchorEl(event.currentTarget);
  };

  const handleMenuClose = () => {
    setAnchorEl(null);
    handleMobileMenuClose();
  };

  const handleMobileMenuOpen = (event: React.MouseEvent<HTMLElement>) => {
    setMobileMoreAnchorEl(event.currentTarget);
  };

  const handleOnChange = (e: any) => {
    setMenuDrawerOpen(e);
  };

  const menuId = 'primary-search-account-menu';
  const renderMenu = (
    <Menu
      anchorEl={anchorEl}
      anchorOrigin={{ vertical: 'top', horizontal: 'right' }}
      id={menuId}
      keepMounted
      transformOrigin={{ vertical: 'top', horizontal: 'right' }}
      open={isMenuOpen}
      onClose={handleMenuClose}
    >
      <MenuItem onClick={handleMenuClose} disabled>Profile</MenuItem>
      <MenuItem onClick={handleMenuClose} disabled>My account</MenuItem>
      <MenuItem onClick={logout}>Log out</MenuItem>
    </Menu>
  );

  const mobileMenuId = 'primary-search-account-menu-mobile';
  const renderMobileMenu = (
    <Menu
      anchorEl={mobileMoreAnchorEl}
      anchorOrigin={{ vertical: 'top', horizontal: 'right' }}
      id={mobileMenuId}
      keepMounted
      transformOrigin={{ vertical: 'top', horizontal: 'right' }}
      open={isMobileMenuOpen}
      onClose={handleMobileMenuClose}
    >
      <MenuItem disabled>
        <IconButton aria-label="show 4 new mails" color="inherit">
          {/* <Badge badgeContent={4} color="secondary"> */}
          <MailIcon />
          {/* </Badge> */}
        </IconButton>
        <p>Messages</p>
      </MenuItem>
      <MenuItem disabled>
        <IconButton aria-label="show 11 new notifications" color="inherit">
          {/* <Badge badgeContent={11} color="secondary"> */}
          <NotificationsIcon />
          {/* </Badge> */}
        </IconButton>
        <p>Notifications</p>
      </MenuItem>
      <MenuItem onClick={handleProfileMenuOpen} disabled>
        <IconButton
          aria-label="account of current user"
          aria-controls="primary-search-account-menu"
          aria-haspopup="true"
          color="inherit"
        >
          <AccountCircle />
        </IconButton>
        <p>Profile</p>
      </MenuItem>
      <MenuItem onClick={logout}>
        <IconButton>
          <Avatar
            alt={user?.result.name}
            src={user?.result.imageUrl}
          >
            {user?.result.name.charAt(0)}
          </Avatar>
        </IconButton>
        <p>Logout</p>
      </MenuItem>
    </Menu>
  );

  return (
    <div className={classes.grow}>
      <AppBar position="static">
        <Toolbar>
          <IconButton
            edge="start"
            className={classes.menuButton}
            color="inherit"
            aria-label="open drawer"
            onClick={() => setMenuDrawerOpen(true)}
          >
            <MenuIcon />
          </IconButton>
          <Button
            color="inherit"
            size="large"
            onClick={() => navigate('/dashboard')}
          >
            Goal Tracker
          </Button>
          <Drawer
            open={menuDrawerOpen}
            onChange={handleOnChange}
            user={user}
          />
          <div className={classes.grow} />
          {user?.result ? (
            <>
              <div className={classes.sectionDesktop}>
                <IconButton aria-label="show 4 new mails" color="inherit" disabled>
                  {/* <Badge badgeContent={4} color="secondary"> */}
                  <MailIcon />
                  {/* </Badge> */}
                </IconButton>
                <IconButton aria-label="show 17 new notifications" color="inherit" disabled>
                  {/* <Badge badgeContent={17} color="secondary"> */}
                  <NotificationsIcon />
                  {/* </Badge> */}
                </IconButton>
                <IconButton
                  edge="end"
                  aria-label="account of current user"
                  aria-controls={menuId}
                  aria-haspopup="true"
                  onClick={handleProfileMenuOpen}
                  color="inherit"
                >
                  <Avatar
                    alt={user?.result.name}
                    src={user?.result.imageUrl}
                  >
                    {user?.result.name.charAt(0)}
                  </Avatar>
                </IconButton>
              </div>

              <div className={classes.sectionMobile}>
                <IconButton
                  aria-label="show more"
                  aria-controls={mobileMenuId}
                  aria-haspopup="true"
                  onClick={handleMobileMenuOpen}
                  color="inherit"
                >
                  <MoreIcon />
                </IconButton>
              </div>
            </>
          ) : (
            <Button
              color="secondary"
              variant="contained"
              onClick={handleLogin}
            >
              Sign In
            </Button>
          )}
        </Toolbar>
      </AppBar>
      {renderMobileMenu}
      {renderMenu}
    </div>
  );
}
