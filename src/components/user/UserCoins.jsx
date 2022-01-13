/* eslint-disable react/prop-types */
import React, {Fragment, useEffect, useState} from 'react';
import Table from '@mui/material/Table';
import TableBody from '@mui/material/TableBody';
import TableCell from '@mui/material/TableCell';
import TableContainer from '@mui/material/TableContainer';
import TableHead from '@mui/material/TableHead';
import TableRow from '@mui/material/TableRow';
import Paper from '@mui/material/Paper';
import Avatar from '@mui/material/Avatar';
import {useStore} from '../../store';
import {fixedNumber, humanReadableValue} from '../../utility';
import useDeviceType from '../hooks/useDeviceType';
import Visibility from '../Visibility';

// Get List of coins from user's wallet
const getCoinList = wallet => {
  let coinList = [];
  for (const i in wallet.coins) {
    const count = fixedNumber(wallet.coins[i]);
    if (count > 0) {
      coinList.push({id: i, count: count});
    }
  }
  return coinList;
};

// Get Avatar of coin
const getCoinAvatar = (coins, coinId) => {
  let avatar = '';
  coins.forEach(item => {
    if (item.id === coinId) {
      avatar = item.avatar;
    }
  });
  return avatar;
};

const UserCoinStats = ({coinId, count, prices, coinInvestment, isMobile}) => {
  if (prices) {
    const value = prices[coinId].last * count;
    const investment = Math.max(0, coinInvestment ? coinInvestment[coinId] : 0);
    const profit = value - investment;
    const profitPercent = (100 * profit) / investment;

    const coinCout = isMobile ? humanReadableValue(count) : count;

    return (
      <Fragment>
        <TableCell align="center">{coinCout}</TableCell>
        <TableCell align="center">{humanReadableValue(investment)}</TableCell>
        <TableCell align="center">{humanReadableValue(value)}</TableCell>
        <TableCell align="center" sx={{color: profit < 0 ? 'red' : 'green'}}>
          {humanReadableValue(profit)}
        </TableCell>
        <TableCell align="right" sx={{color: profit < 0 ? 'red' : 'green'}}>
          {humanReadableValue(profitPercent)}%
        </TableCell>
      </Fragment>
    );
  }

  return null;
};

const UserCoins = ({user, transactions}) => {
  const coinPrices = useStore(state => state.coinPrices);
  const loadCoinPrices = useStore(state => state.loadCoinPrices);
  const coins = useStore(state => state.coins);
  const [coinInvestment, setCoinInvestment] = useState();

  const isMobile = 'mobile' === useDeviceType();

  useEffect(() => {
    loadCoinPrices();
  }, []);

  useEffect(() => {
    if (transactions) {
      let cids = {};
      coins.forEach(item => {
        cids[item.id] = 0;
      });

      transactions.forEach(item => {
        if (item.transType == 'BUY') {
          cids[item.coinId] +=
            item.coinCount * item.cost + parseFloat(item.fee);
        } else {
          cids[item.coinId] -=
            item.coinCount * item.cost - parseFloat(item.fee);
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
