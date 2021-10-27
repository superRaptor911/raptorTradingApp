/* eslint-disable react/prop-types */
import React, {Fragment, useEffect, useState} from 'react';
import {useStore} from '../store';
import Table from '@mui/material/Table';
import TableBody from '@mui/material/TableBody';
import TableCell from '@mui/material/TableCell';
import TableContainer from '@mui/material/TableContainer';
import TableHead from '@mui/material/TableHead';
import TableRow from '@mui/material/TableRow';
import Paper from '@mui/material/Paper';
import Avatar from '@mui/material/Avatar';
import {useHistory} from 'react-router-dom';
import useDeviceType from './hooks/useDeviceType';
import Visibility from './Visibility';

const processUser = user => {
  const inv = parseFloat(user.wallet.investment);
  const bal = parseFloat(user.wallet.balance).toFixed(2);
  user.wallet.investment = Math.max(0, inv);
  user.wallet.balance = bal;
  return user;
};

const calculateCurrentValue = (userCoins, prices, coinIds, balance) => {
  let total = 0;

  if (prices && coinIds) {
    for (const i in userCoins) {
      const count = parseFloat(userCoins[i].count);
      const value = parseFloat(prices[coinIds[i]].last);

      total += count * value;
    }
  }

  return (total + balance).toFixed(2);
};

const UserStats = ({
  investment,
  userCoins,
  coinPrices,
  coinIds,
  balance,
  isMobile,
}) => {
  const curVal = calculateCurrentValue(userCoins, coinPrices, coinIds, balance);
  const profit = (curVal - investment).toFixed(2);
  const profitPercent = ((100 * profit) / investment).toFixed(2);

  return (
    <Fragment>
      <TableCell>{investment}</TableCell>

      <Visibility hide={isMobile}>
        <TableCell>{curVal}</TableCell>
      </Visibility>

      <Visibility hide={isMobile}>
        <TableCell sx={{color: profit < 0 ? 'red' : 'green'}}>
          {profit}
        </TableCell>
      </Visibility>
      <TableCell align="right" sx={{color: profit < 0 ? 'red' : 'green'}}>
        {profitPercent}%
      </TableCell>
    </Fragment>
  );
};

const UserList = () => {
  const users = useStore(state => state.users);
  const loadUsers = useStore(state => state.loadUsers);

  const coinPrices = useStore(state => state.coinPrices);
  const coins = useStore(state => state.coins);

  const [coinIds, setCoinIds] = useState();
  const history = useHistory();

  const isMobile = 'mobile' === useDeviceType();

  useEffect(() => {
    loadUsers();
  }, []);

  useEffect(() => {
    if (coins) {
      let cids = {};
      coins.forEach(item => {
        cids[item.name] = item.id;
      });

      setCoinIds(cids);
    }
  }, [coins]);

  return (
    <TableContainer
      component={Paper}
      sx={{
        width: 'max-content',
        margin: 'auto',
        marginTop: 10,
      }}>
      <Table sx={{minWidth: '50vw'}} aria-label="simple table">
        <TableHead>
          <TableRow>
            <TableCell>Name</TableCell>
            <TableCell>Investment</TableCell>
            <Visibility hide={isMobile}>
              <TableCell>Current Value</TableCell>
            </Visibility>
            <Visibility hide={isMobile}>
              <TableCell>Profit</TableCell>
            </Visibility>
            <TableCell align="right">Profit %</TableCell>
          </TableRow>
        </TableHead>

        <TableBody>
          {users &&
            users.map(processUser).map((row, id) => (
              <TableRow key={id}>
                <TableCell
                  component="th"
                  scope="row"
                  onClick={() => {
                    history.push('/user/' + row.name);
                  }}
                  sx={{display: 'flex', alignItems: 'center'}}>
                  <Avatar
                    src={row.avatar}
                    alt={row.name}
                    sx={{marginRight: 2}}
                  />
                  <Visibility hide={isMobile}>{row.name}</Visibility>
                </TableCell>

                <UserStats
                  investment={row.wallet.investment}
                  coinPrices={coinPrices}
                  userCoins={row.wallet.coins}
                  coinIds={coinIds}
                  balance={parseFloat(row.wallet.balance)}
                  isMobile={isMobile}
                />
              </TableRow>
            ))}
        </TableBody>
      </Table>
    </TableContainer>
  );
};

export default UserList;
