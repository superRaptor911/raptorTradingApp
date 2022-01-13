/* eslint-disable react/prop-types */
import React, {Fragment, useEffect, useState} from 'react';
import Paper from '@mui/material/Paper';
import Typography from '@mui/material/Typography';
import {useParams} from 'react-router-dom';
import CircularProgress from '@mui/material/CircularProgress';
import {useStore} from '../store';
import {Avatar} from '@mui/material';
import Table from '@mui/material/Table';
import TableBody from '@mui/material/TableBody';
import TableCell from '@mui/material/TableCell';
import TableContainer from '@mui/material/TableContainer';
import TableHead from '@mui/material/TableHead';
import TableRow from '@mui/material/TableRow';
import {get24HrChange} from '../utility';

const getCoin = (coins, coinName) => {
  for (const i of coins) {
    if (i.name == coinName) {
      return i;
    }
  }
  return null;
};

const CoinDetails = ({coin}) => {
  const coinPrices = useStore(state => state.coinPrices);
  return (
    <TableContainer
      component={Paper}
      sx={{
        width: '90vw',
        maxWidth: 1000,
        margin: 'auto',
        marginTop: 10,
      }}>
      <Table sx={{minWidth: '50vw'}} aria-label="simple table">
        <TableHead>
          <TableRow>
            <TableCell>Coin</TableCell>
            <TableCell>Coin ID</TableCell>
            <TableCell align="center">Current Value</TableCell>
            <TableCell align="right">Delta</TableCell>
          </TableRow>
        </TableHead>

        <TableBody>
          {coin && (
            <TableRow>
              <TableCell
                component="th"
                scope="row"
                sx={{display: 'flex', alignItems: 'center'}}>
                <Avatar
                  src={coin.avatar}
                  alt={coin.name}
                  sx={{marginRight: 2}}
                />
                {coin.name}
              </TableCell>
              <TableCell>{coin.id}</TableCell>
              <TableCell align="center">
                {getCoinPrice(coinPrices, coin.id)}
              </TableCell>

              <TableCell
                align="right"
                sx={{
                  color:
                    get24HrChange(coinPrices, coin.id) < 0 ? 'red' : 'green',
                }}>
                {get24HrChange(coinPrices, coin.id)}%
              </TableCell>
            </TableRow>
          )}
        </TableBody>
      </Table>
    </TableContainer>
  );
};

const Coin = () => {
  const {coinName} = useParams();
  const [coin, setCoin] = useState();

  const coins = useStore(state => state.coins);
  const loadCoinPrices = useStore(state => state.loadCoinPrices);

  useEffect(() => {
    setCoin(getCoin(coins, coinName));
  }, [coinName]);

  useEffect(() => {
    loadCoinPrices();
  }, []);

  return (
    <div
      style={{
        width: 'max-content',
        margin: 'auto',
        marginTop: 80,
        maxWidth: '100vw',
      }}>
      <Paper sx={{paddingTop: 10, maxWidth: '95vw', margin: 'auto'}}>
        {coin ? (
          <Fragment>
            <Avatar
              src={coin.avatar}
              alt={coin.name}
              sx={{width: 128, height: 128, margin: 'auto'}}
            />
            <Typography sx={{textAlign: 'center'}}>{coin.name}</Typography>
          </Fragment>
        ) : (
          <CircularProgress />
        )}
      </Paper>
    </div>
  );
};

export default Coin;
