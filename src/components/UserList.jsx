import React, {useEffect} from 'react';
import {useStore} from '../store';
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

const getCoinId = (coins, coinName) => {
  for (const i of coins) {
    if (i.name == coinName) {
      return i.id;
    }
  }

  return '';
};

const calculateCurrentValue = (userCoins, prices, coins) => {
  let total = 0;

  if (prices) {
    for (const i in userCoins) {
      const count = parseFloat(userCoins[i].count);
      const value = parseFloat(prices[getCoinId(coins, i)].last);

      total += count * value;
    }
  }

  return total.toFixed(2);
};

const UserList = () => {
  const users = useStore(state => state.users);
  const loadUsers = useStore(state => state.loadUsers);

  const coinPrices = useStore(state => state.coinPrices);
  const coins = useStore(state => state.coins);

  useEffect(() => {
    loadUsers();
  }, []);

  console.log('Rendering');
  return (
    <TableContainer
      component={Paper}
      sx={{
        width: 'max-content',
        margin: 'auto',
        marginTop: 10,
      }}>
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
                <TableCell align="right">
                  {calculateCurrentValue(row.wallet.coins, coinPrices, coins)}
                </TableCell>
              </TableRow>
            ))}
        </TableBody>
      </Table>
    </TableContainer>
  );
};

export default UserList;
