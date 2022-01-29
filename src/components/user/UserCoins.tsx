import React, {useEffect, useState} from 'react';
import Table from '@mui/material/Table';
import TableBody from '@mui/material/TableBody';
import TableCell from '@mui/material/TableCell';
import TableContainer from '@mui/material/TableContainer';
import TableHead from '@mui/material/TableHead';
import TableRow from '@mui/material/TableRow';
import Paper from '@mui/material/Paper';
import Avatar from '@mui/material/Avatar';
import {useStore} from '../../store';
import useDeviceType from '../hooks/useDeviceType';
import Visibility from '../Visibility';
import {Transaction, User} from '../../types';
import {getCoinAvatar, getCoinList} from './helper';
import UserCoinStats from './UserCoinStats';

interface UserCoinsProps {
  user: User;
  transactions: Transaction[];
}

const UserCoins = ({user, transactions}: UserCoinsProps) => {
  const coinPrices = useStore(state => state.coinPrices);
  const loadCoinPrices = useStore(state => state.loadCoinPrices);
  const coins = useStore(state => state.coins);
  const [coinInvestment, setCoinInvestment] = useState<{[key: string]: number}>(
    {},
  );

  const isMobile = 'mobile' === useDeviceType();

  useEffect(() => {
    loadCoinPrices();
  }, []);

  useEffect(() => {
    if (transactions) {
      let cids: {[key: string]: number} = {};
      coins.forEach(item => {
        cids[item.id] = 0;
      });

      transactions.forEach(item => {
        if (item.transType == 'BUY') {
          cids[item.coinId] += item.coinCount * item.cost + Number(item.fee);
        } else {
          cids[item.coinId] -= item.coinCount * item.cost - Number(item.fee);
        }
      });
      setCoinInvestment(cids);
    }
  }, [transactions]);

  return (
    <TableContainer
      component={Paper}
      sx={{
        width: 'max-content',
        maxWidth: '100%',
        margin: 'auto',
        marginTop: 10,
        marginBottom: 10,
      }}>
      <Table sx={{minWidth: '50vw'}} aria-label="simple table">
        <TableHead>
          <TableRow>
            <TableCell>Coin</TableCell>
            <TableCell align="center">Count</TableCell>
            <TableCell align="center">Investment</TableCell>
            <TableCell align="center">Current Value</TableCell>
            <TableCell align="center">Profit</TableCell>
            <TableCell align="right">Profit %</TableCell>
          </TableRow>
        </TableHead>

        <TableBody>
          {user &&
            coins &&
            getCoinList(user.wallet).map((row, id) => (
              <TableRow key={id}>
                <TableCell
                  component="th"
                  scope="row"
                  sx={{display: 'flex', alignItems: 'center'}}>
                  <Avatar
                    src={getCoinAvatar(coins, row.id)}
                    alt={row.id}
                    sx={{marginRight: 2}}
                  />
                  <Visibility hide={isMobile}>{row.id}</Visibility>
                </TableCell>
                <UserCoinStats
                  coinId={row.id}
                  prices={coinPrices}
                  count={row.count}
                  coinInvestment={coinInvestment}
                  isMobile={isMobile}
                />
              </TableRow>
            ))}
        </TableBody>
      </Table>
    </TableContainer>
  );
};

export default UserCoins;
