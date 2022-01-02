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

const Header = () => {
  const [showMenu, setShowMenu] = useState(false);
  const [user, setUser] = useState();
  const userCred = useStore(state => state.userCred);
  const users = useStore(state => state.users);

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
            <Avatar
              src={user.avatar}
              alt={user.name}
              onClick={() => history.push(ROUTES.userPath + user.name)}
            />
          ) : (
            <Button
              color="inherit"
              onClick={() => history.push(ROUTES.loginUser)}>
              Login
            </Button>
          )}
        </Toolbar>
      </AppBar>
    </Box>
  );
};

export default Header;
