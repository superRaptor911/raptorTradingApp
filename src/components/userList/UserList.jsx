import React, {useEffect} from 'react';
import {useStore} from '../../store';
import Table from '@mui/material/Table';
import TableBody from '@mui/material/TableBody';
import TableCell from '@mui/material/TableCell';
import TableContainer from '@mui/material/TableContainer';
import TableHead from '@mui/material/TableHead';
import TableRow from '@mui/material/TableRow';
import Paper from '@mui/material/Paper';
import Avatar from '@mui/material/Avatar';

const processUser = user => {
  const inv = parseFloat(user.wallet.investment);
  const bal = parseFloat(user.wallet.balance).toFixed(2);
  user.wallet.investment = Math.max(0, inv);
  user.wallet.balance = bal;
  return user;
};

const UserList = () => {
  const users = useStore(state => state.users);
  const loadUsers = useStore(state => state.loadUsers);
  useEffect(() => {
    loadUsers();
  }, []);

  console.log('Rendering');
  return (
    <div style={{margin: 'auto', marginTop: 30, width: 'max-content'}}>
      <TableContainer component={Paper} sx={{width: 'max-content'}}>
        <Table sx={{minWidth: 650}} aria-label="simple table">
          <TableHead>
            <TableRow>
              <TableCell>Name</TableCell>
              <TableCell align="right">Investment</TableCell>
              <TableCell align="right">Current Value</TableCell>
            </TableRow>
          </TableHead>

          <TableBody>
            {users &&
              users.map(processUser).map((row, id) => (
                <TableRow key={id}>
                  <TableCell
                    component="th"
                    scope="row"
                    sx={{display: 'flex', alignItems: 'center'}}>
                    <Avatar
                      src={row.avatar}
                      alt={row.name}
                      sx={{marginRight: 2}}
                    />
                    {row.name}
                  </TableCell>
                  <TableCell align="right">{row.wallet.investment}</TableCell>
                  <TableCell align="right">{row.wallet.balance}</TableCell>
                </TableRow>
              ))}
          </TableBody>
        </Table>
      </TableContainer>
    </div>
  );
};

export default UserList;
