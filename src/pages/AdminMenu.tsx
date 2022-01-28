import {Button} from '@mui/material';
import React from 'react';
import {useHistory} from 'react-router-dom';
import {ROUTES} from '../routes';

const AdminMenu = () => {
  const history = useHistory();

  return (
    <div
      style={{
        margin: 'auto',
        width: '80%',
        maxWidth: 600,
        display: 'flex',
        flexDirection: 'column',
        justifyContent: 'space-between',
        height: 250,
        marginTop: '10%',
      }}>
      <Button
        variant="contained"
        color="secondary"
        onClick={() => history.push(ROUTES.addUser)}
        sx={{
          width: '100%',
        }}>
        Add User
      </Button>

      <Button
        variant="contained"
        color="secondary"
        onClick={() => history.push(ROUTES.addCoin)}
        sx={{
          width: '100%',
        }}>
        Add Coin
      </Button>

      <Button
        variant="contained"
        color="secondary"
        onClick={() => history.push(ROUTES.fundTransfer)}
        sx={{
          width: '100%',
        }}>
        Fund transfer
      </Button>

      <Button
        variant="contained"
        color="secondary"
        onClick={() => history.push(ROUTES.addTrans)}
        sx={{
          width: '100%',
        }}>
        Add Transaction
      </Button>

      <Button
        variant="contained"
        color="secondary"
        onClick={() => history.push(ROUTES.adminLogin)}
        sx={{
          width: '100%',
        }}>
        Admin Login
      </Button>
    </div>
  );
};

export default AdminMenu;
