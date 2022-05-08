import React, {Fragment, useEffect, useState} from 'react';
import AppBar from '@mui/material/AppBar';
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
import {styled} from '@mui/material';
import {User} from '../types';

const Offset = styled('div')(({theme}) => theme.mixins.toolbar);

const Header = () => {
  const [showMenu, setShowMenu] = useState(false);
  const [user, setUser] = useState<null | User>();
  const userCred = useStore(state => state.userCred);
  const setUserCred = useStore(state => state.setUserCred);
  const users = useStore(state => state.users);
  const [anchorEl, setAnchorEl] = useState<null | HTMLElement>();
  const open = Boolean(anchorEl);

  const handleClick = (event: React.MouseEvent<HTMLDivElement>) => {
    setAnchorEl(event.currentTarget);
  };

  const handleClose = () => {
    setAnchorEl(null);
  };

  const handleMyAccount = () => {
    user && history.push(ROUTES.userPath + user.name);
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
    <Fragment>
      <AppBar position="fixed" style={{background: '#1D1D1D'}}>
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
              variant="outlined"
              style={{marginRight: 10}}
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
      <Offset />
    </Fragment>
  );
};

export default Header;
