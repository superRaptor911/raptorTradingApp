import {Button, Paper} from '@mui/material';
import {useHistory} from 'react-router-dom';
import {ROUTES} from '../routes';

const AdminMenu = () => {
  const history = useHistory();

  return (
    <Paper
      style={{
        margin: 'auto',
        width: '80%',
        maxWidth: 800,
        display: 'flex',
        flexDirection: 'column',
        justifyContent: 'space-between',
        marginTop: '10%',
        padding: 50,
        borderRadius: 10,
      }}>
      <Button
        variant="contained"
        onClick={() => history.push(ROUTES.addUser)}
        sx={{
          width: '100%',
          backgroundColor: '#c4c4c4',
          color: 'black',
          marginTop: 2,
        }}>
        Add User
      </Button>

      <Button
        variant="contained"
        onClick={() => history.push(ROUTES.addCoin)}
        sx={{
          width: '100%',
          backgroundColor: '#c4c4c4',
          color: 'black',
          marginTop: 2,
        }}>
        Add Coin
      </Button>

      <Button
        variant="contained"
        onClick={() => history.push(ROUTES.fundTransfer)}
        sx={{
          width: '100%',
          backgroundColor: '#c4c4c4',
          color: 'black',
          marginTop: 2,
        }}>
        Fund transfer
      </Button>

      <Button
        variant="contained"
        onClick={() => history.push(ROUTES.addTrans)}
        sx={{
          width: '100%',
          backgroundColor: '#c4c4c4',
          color: 'black',
          marginTop: 2,
        }}>
        Add Transaction
      </Button>

      <Button
        variant="contained"
        onClick={() => history.push(ROUTES.adminLogin)}
        sx={{
          backgroundColor: '#c4c4c4',
          color: 'black',
          width: '100%',
          marginTop: 2,
          marginBottom: 2,
        }}>
        Admin Login
      </Button>
    </Paper>
  );
};

export default AdminMenu;
