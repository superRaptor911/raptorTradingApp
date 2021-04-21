// File for Navbar component
import {useHistory} from "react-router-dom";
import { makeStyles } from '@material-ui/core/styles';
import AppBar from '@material-ui/core/AppBar';
import Toolbar from '@material-ui/core/Toolbar';
import Typography from '@material-ui/core/Typography';
import Button from '@material-ui/core/Button';
import Avatar from '@material-ui/core/Avatar';
import Container from '@material-ui/core/Container';
import logo from '../logo1.png';
import SideDrawer from "./SideDrawer";

const useStyles = makeStyles((theme) => ({
  root: {
    flexGrow: 1,
    marginTop: 0,
    top: 0,
    position: 'fixed',
    marginBottom: 0,
  },
  menuButton: {
    marginRight: theme.spacing(2),
  },
  title: {
    flexGrow: 1,
  },
  medium: {
    width: theme.spacing(6),
    height: theme.spacing(6),
  },
  container: {
    display: 'inline-block',
    textAlign: 'right'
  },
  emptyDiv: {
    margin: 0,
  }
}));

const Header = () => {
  const classes = useStyles();
  const history = useHistory();

  return (
    <div>
      <AppBar className={classes.root}>
        <Toolbar>
          <SideDrawer/>
          <Button onClick={() => history.push('/')}>
            <Avatar 
              className={classes.medium}
              alt="Hackclub_logo"
              src={logo}
            />
          </Button>
          <Typography variant="h6" className={classes.title}>
            Cucek Trading
          </Typography>
          <Container className={classes.container}>
            <Button color="inherit" onClick={() => history.push('/')}>HOME</Button>
            <Button color="inherit" onClick={() => history.push('/adminmenu')}>MENU</Button>
          </Container>
        </Toolbar>
      </AppBar>
      <div className={classes.emptyDiv}></div>
    </div>
  );
}

export default Header
