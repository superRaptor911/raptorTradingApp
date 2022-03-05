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
  {
    name: 'Trading',
    link: ROUTES.tradingMenu,
  },
  {
    name: 'Automations',
    link: ROUTES.automations,
  },
  {
    name: 'Admin Menu',
    link: ROUTES.adminMenu,
  },
  {
    name: 'Leaderboard',
    link: ROUTES.leaderboard,
  },
];

interface DrawerMenuProps {
  showDrawer: boolean;
  toggleDrawer: () => void;
}

const DrawerMenu = ({showDrawer, toggleDrawer}: DrawerMenuProps) => {
  const history = useHistory();
  return (
    <Drawer open={showDrawer} onClose={toggleDrawer}>
      <List>
        {Menus.map((item, id) => (
          <div key={id}>
            <ListItem
              button
              onClick={() => {
                history.push(item.link);
              }}>
              <ListItemText primary={item.name} />
            </ListItem>
            <Divider />
          </div>
        ))}
      </List>
    </Drawer>
  );
};

export default DrawerMenu;
