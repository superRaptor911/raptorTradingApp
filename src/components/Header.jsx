/* eslint-disable react/prop-types */
import React, {useEffect, useState} from 'react';
import AppBar from '@mui/material/AppBar';
import Box from '@mui/material/Box';
import Toolbar from '@mui/material/Toolbar';
import Typography from '@mui/material/Typography';
import Button from '@mui/material/Button';
import IconButton from '@mui/material/IconButton';
import MenuIcon from '@mui/icons-material/Menu';
import DrawerMenu from './header/DrawerMenu';
import Avatar from '@mui/material/Avatar';
import {useHistory} from 'react-router-dom';
import {ROUTES} from '../routes';
import {useStore} from '../store';
import {loginUser} from '../api/api';
import Menu from '@mui/material/Menu';
import MenuItem from '@mui/material/MenuItem';

const Header = () => {
  const [showMenu, setShowMenu] = useState(false);
  const [user, setUser] = useState();
  const userCred = useStore(state => state.userCred);
  const setUserCred = useStore(state => state.setUserCred);
  const users = useStore(state => state.users);
  const [anchorEl, setAnchorEl] = useState();
  const open = Boolean(anchorEl);

  const handleClick = event => {
    setAnchorEl(event.currentTarget);
  };

  const handleClose = () => {
    setAnchorEl(null);
  };

  const handleMyAccount = () => {
    history.push(ROUTES.userPath + user.name);
    setAnchorEl(null);
  };

  const handleLogout = () => {
    setUserCred(null);
    setUser(null);
    setAnchorEl(null);
  };

  useEffect(() => {
    if (userCred && userCred.email && userCred.password && users) {
      loginUser(userCred.email, userCred.password).then(response => {
        if (response && response.status) {
          for (const i of users) {
            if (i.email === userCred.email) {
              setUser(i);
            }
          }
        }
      });
    }
  }, [userCred, users]);

  const toggleMenu = () => {
    setShowMenu(!showMenu);
  };

  const history = useHistory();
  return (
    <Box sx={{flexGrow: 1}}>
      <AppBar position="sticky">
        <Toolbar>
          <IconButton
            size="large"
            edge="start"
            color="inherit"
            aria-label="menu"
            onClick={toggleMenu}
            sx={{mr: 2}}>
            <MenuIcon />
            <DrawerMenu showDrawer={showMenu} toggleDrawer={toggleMenu} />
          </IconButton>
          <Typography
            variant="h6"
            component="div"
            sx={{flexGrow: 1}}
            onClick={() => history.push(ROUTES.home)}>
            Raptor Trading
          </Typography>

          {user ? (
            <Avatar src={user.avatar} alt={user.name} onClick={handleClick} />
          ) : (
            <Button
              color="inherit"
              onClick={() => history.push(ROUTES.loginUser)}>
              Login
            </Button>
          )}

          <Menu
            id="basic-menu"
            anchorEl={anchorEl}
            open={open}
            onClose={handleClose}
            MenuListProps={{
              'aria-labelledby': 'basic-button',
            }}>
            <MenuItem onClick={handleMyAccount}>My account</MenuItem>
            <MenuItem onClick={handleLogout}>Logout</MenuItem>
          </Menu>
        </Toolbar>
      </AppBar>
    </Box>
  );
};

export default Header;
