import React, {Fragment, useEffect} from 'react';
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
import {humanReadableValue} from '../utility';
import {Wallet} from '../types';
import {calculatePortfolio} from './helper';

interface UserStatsProps {
  wallet: Wallet;
  coinPrices: any;
  isMobile: boolean;
}

// Pre-process user
const getInvestmentAndBalance = (wallet: Wallet) => {
  const inv = wallet.investment;
  const bal = wallet.balance.toFixed(2);

  const rtn = [Math.max(0, inv), Number(bal)];
  return rtn;
};

const UserStats = ({wallet, coinPrices, isMobile}: UserStatsProps) => {
  const [investment, _balance] = getInvestmentAndBalance(wallet);
  const curVal = calculatePortfolio(wallet, coinPrices);
  const profit = curVal - investment;
  const profitPercent = (100 * profit) / investment;

  return (
    <Fragment>
      <TableCell>{investment}</TableCell>
      <TableCell>
        {isMobile ? humanReadableValue(curVal) : curVal.toFixed(2)}
      </TableCell>

      <Visibility hide={isMobile}>
        <TableCell sx={{color: profit < 0 ? 'red' : 'green'}}>
          {profit.toFixed(2)}
        </TableCell>
      </Visibility>
      <TableCell align="right" sx={{color: profit < 0 ? 'red' : 'green'}}>
        {profitPercent.toFixed(2)}%
      </TableCell>
    </Fragment>
  );
};

// List users And their profits
const UserList = () => {
  const users = useStore(state => state.users);
  const loadUsers = useStore(state => state.loadUsers);

  const coinPrices = useStore(state => state.coinPrices);
  const history = useHistory();

  const isMobile = 'mobile' === useDeviceType();

  useEffect(() => {
    loadUsers();
  }, []);

  return (
    <TableContainer
      component={Paper}
      sx={{
        width: '90vw',
        maxWidth: 1000,
        margin: 'auto',
        marginTop: 10,
        marginBottom: 10,
      }}>
      <Table sx={{minWidth: '50vw'}} aria-label="simple table">
        <TableHead>
          <TableRow>
            <TableCell>Name</TableCell>
            <TableCell>Investment</TableCell>
            <TableCell>Value</TableCell>
            <Visibility hide={isMobile}>
              <TableCell>Profit</TableCell>
            </Visibility>
            <TableCell align="right">Profit %</TableCell>
          </TableRow>
        </TableHead>

        <TableBody>
          {users &&
            users.map((row, id) => (
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
                  coinPrices={coinPrices}
                  wallet={row.wallet}
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
