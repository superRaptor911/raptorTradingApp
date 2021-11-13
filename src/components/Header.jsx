import React, {useState} from 'react';

import AppBar from '@mui/material/AppBar';
import Box from '@mui/material/Box';
import Toolbar from '@mui/material/Toolbar';
import Typography from '@mui/material/Typography';
import Button from '@mui/material/Button';
import IconButton from '@mui/material/IconButton';
import MenuIcon from '@mui/icons-material/Menu';
import DrawerMenu from './header/DrawerMenu';
import {useHistory} from 'react-router-dom';
import {ROUTES} from '../routes';

const Header = () => {
  const [showMenu, setShowMenu] = useState(false);
  const toggleMenu = () => {
    setShowMenu(!showMenu);
  };

  const history = useHistory();
  return (
    <Box sx={{flexGrow: 1}}>
      <AppBar position="static">
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
          <Typography variant="h6" component="div" sx={{flexGrow: 1}}>
            Raptor Trading
          </Typography>
          <Button
            color="inherit"
            onClick={() => history.push(ROUTES.adminMenu)}>
            Admin
          </Button>
        </Toolbar>
      </AppBar>
    </Box>
  );
};

export default Header;
