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

const UserCoinStats = ({coinName, count, prices}) => {
  if (prices) {
    const value = prices[coinName] * count;
    return (
      <Fragment>
        <TableCell align="right">{humanReadableValue(count)}</TableCell>
        <TableCell align="right">{humanReadableValue(value)}</TableCell>
      </Fragment>
    );
  }

  return null;
};

const UserCoins = ({user}) => {
  const coinPrices = useStore(state => state.coinPrices);
  const coins = useStore(state => state.coins);
  const [prices, setPrices] = useState();

  useEffect(() => {
    if (coins && coinPrices) {
      let cids = {};
      coins.forEach(item => {
        cids[item.name] = coinPrices[item.id].last;
      });

      setPrices(cids);
    }
  }, [coins, coinPrices]);

  console.log(coins);
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
            <TableCell>Coin</TableCell>
            <TableCell align="right">Count</TableCell>
            <TableCell align="right">Current Value</TableCell>
            {/* <TableCell align="right">Profit</TableCell> */}
            {/* <TableCell align="right">Profit %</TableCell> */}
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
                  {row.name}
                </TableCell>
                <UserCoinStats
                  coinName={row.name}
                  prices={prices}
                  count={row.count}
                />
              </TableRow>
            ))}
        </TableBody>
      </Table>
    </TableContainer>
  );
};

export default UserCoins;
