/* eslint-disable react/prop-types */
import React from 'react';
import Drawer from '@mui/material/Drawer';
import List from '@mui/material/List';
import Divider from '@mui/material/Divider';
import ListItem from '@mui/material/ListItem';
import ListItemIcon from '@mui/material/ListItemIcon';
import ListItemText from '@mui/material/ListItemText';
import InboxIcon from '@mui/icons-material/MoveToInbox';
import MailIcon from '@mui/icons-material/Mail';
import {ROUTES} from '../../routes';
import {useHistory} from 'react-router-dom';

const Menus = [
  {
    name: 'Home',
    link: ROUTES.home,
  },
  {
    name: 'Summary',
    link: ROUTES.summary,
  },
];

const DrawerMenu = ({showDrawer, toggleDrawer}) => {
  const history = useHistory();
  return (
    <Drawer open={showDrawer} onClose={toggleDrawer}>
      <List>
        {Menus.map((item, id) => (
          <ListItem
            button
            key={id}
            onClick={() => {
              history.push(item.link);
            }}>
            <ListItemIcon>
              {id % 2 === 0 ? <InboxIcon /> : <MailIcon />}
            </ListItemIcon>
            <ListItemText primary={item.name} />
          </ListItem>
        ))}
      </List>
      <Divider />
    </Drawer>
  );
};

export default DrawerMenu;
