/* eslint-disable react/prop-types */
import React from 'react';
import Drawer from '@mui/material/Drawer';
import List from '@mui/material/List';
import Divider from '@mui/material/Divider';
import ListItem from '@mui/material/ListItem';
import ListItemText from '@mui/material/ListItemText';
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
  {
    name: 'Transactions',
    link: ROUTES.transactions,
  },
  // {
  //   name: 'Trading',
  //   link: ROUTES.tradingMenu,
  // },
  {
    name: 'Admin Menu',
    link: ROUTES.adminMenu,
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
            <ListItemText primary={item.name} />
          </ListItem>
        ))}
      </List>
      <Divider />
    </Drawer>
  );
};

export default DrawerMenu;
