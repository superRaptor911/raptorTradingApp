import {useHistory} from "react-router-dom";
import { makeStyles } from '@material-ui/core/styles';
import Button from '@material-ui/core/Button';

const useStyles = makeStyles((theme) => ({
  root: {
    width: '90%',
    maxWidth: 600,
    display: 'block',
    marginLeft: 'auto',
    margin: 'auto',

    marginTop: 200,
  },
  button: {
    marginTop: 10,
    marginBottom: 10,
    width: '100%'
  }
}));

const AdminMenu = () => {
  const classes = useStyles();
  const history = useHistory();

  return (
    <div className={classes.root}>
      <Button 
        variant="contained"
        className={classes.button} 
        color="secondary"
        size='large'
        onClick={() => history.push('/adduser')}
      >
      ADD USER
      </Button>

      <Button 
        variant="contained"
        className={classes.button} 
        color="secondary"
        size='large'
        onClick={() => history.push('/addcoin')}
      >
      ADD COIN
      </Button>

      <Button 
        variant="contained"
        className={classes.button} 
        color="secondary"
        size='large'
        onClick={() => history.push('/transferfund')}
      >
      TRANSFER FUND
      </Button>

      <Button 
        variant="contained"
        className={classes.button} 
        color="secondary"
        size='large'
        onClick={() => history.push('/addtransaction')}
      >
      ADD TRANSACTION
      </Button>

      <Button 
        variant="contained"
        className={classes.button} 
        color="secondary"
        size='large'
        onClick={() => history.push('/edittransactionmenu')}
      >
      EDIT TRANSACTION
      </Button>

      <Button 
        variant="contained"
        className={classes.button} 
        color="secondary"
        size='large'
        onClick={() => history.push('/adminlogin')}
      >
      ADMIN LOGIN
      </Button>
    </div>
  );
}

export default AdminMenu
