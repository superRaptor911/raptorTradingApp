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
import {humanReadableValue} from '../../utility';
import useDeviceType from '../hooks/useDeviceType';
import Visibility from '../Visibility';

const getCoinList = wallet => {
  let coinList = [];
  for (const i in wallet.coins) {
    const count = wallet.coins[i].count;
    if (count > 0) {
      coinList.push({name: i, count: count});
    }
  }
  return coinList;
};

const getCoinAvatar = (coins, coinName) => {
  let avatar = '';
  coins.forEach(item => {
    if (item.name === coinName) {
      avatar = item.avatar;
    }
  });
  return avatar;
};

const UserCoinStats = ({coinName, count, prices, coinInvestment, isMobile}) => {
  if (prices) {
    const value = prices[coinName] * count;
    const investment = Math.max(
      0,
      coinInvestment ? coinInvestment[coinName] : 0,
    );
    const profit = value - investment;
    const profitPercent = (100 * profit) / investment;

    return (
      <Fragment>
        <TableCell align="center">{humanReadableValue(count)}</TableCell>
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
  const coins = useStore(state => state.coins);
  const [prices, setPrices] = useState();
  const [coinInvestment, setCoinInvestment] = useState();

  const isMobile = 'mobile' === useDeviceType();

  useEffect(() => {
    if (coins && coinPrices) {
      let cids = {};
      coins.forEach(item => {
        cids[item.name] = coinPrices[item.id].last;
      });

      setPrices(cids);
    }
  }, [coins, coinPrices]);

  useEffect(() => {
    if (transactions) {
      let cids = {};
      coins.forEach(item => {
        cids[item.name] = 0;
      });

      transactions.forEach(item => {
        if (item.transType == 'BUY') {
          cids[item.coin] += item.coinCount * item.cost + parseFloat(item.fee);
        } else {
          cids[item.coin] -= item.coinCount * item.cost - parseFloat(item.fee);
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
                    src={getCoinAvatar(coins, row.name)}
                    alt={row.name}
                    sx={{marginRight: 2}}
                  />
                  <Visibility hide={isMobile}>{row.name}</Visibility>
                </TableCell>
                <UserCoinStats
                  coinName={row.name}
                  prices={prices}
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
