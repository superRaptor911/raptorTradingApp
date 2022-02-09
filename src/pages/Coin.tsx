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
import {get24HrChange, getCoin, getCoinPrice} from '../components/helper';
import MarketGraph from '../components/wazirx/tradingMenu/MarketGraph';
import {Coin} from '../types';
import CoinGraph from '../components/coin/CoinGraph';

interface CoinDetailsProp {
  coin: Coin;
}

const CoinDetails = ({coin}: CoinDetailsProp) => {
  return (
    <TableContainer
      component={Paper}
      sx={{
        width: '90vw',
        maxWidth: 1200,
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
              <TableCell align="center">{getCoinPrice(coin.id)}</TableCell>

              <TableCell
                align="right"
                sx={{
                  color: get24HrChange(coin.id) < 0 ? 'red' : 'green',
                }}>
                {get24HrChange(coin.id)}%
              </TableCell>
            </TableRow>
          )}
        </TableBody>
      </Table>
    </TableContainer>
  );
};

const CoinPage = () => {
  const {coinName}: {coinName: string} = useParams();
  const [coin, setCoin] = useState<Coin | null>();

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
        marginTop: 50,
        maxWidth: '100vw',
      }}>
      <Paper
        sx={{
          paddingTop: 5,
          maxWidth: '95vw',
          margin: 'auto',
          marginBottom: 10,
        }}>
        {coin ? (
          <Fragment>
            <Avatar
              src={coin.avatar}
              alt={coin.name}
              sx={{width: 128, height: 128, margin: 'auto'}}
            />
            <Typography sx={{textAlign: 'center'}}>{coin.name}</Typography>
            <div style={{marginTop: 30}}>
              <CoinGraph coinId={coin.id} />
              <CoinDetails coin={coin} />
            </div>
          </Fragment>
        ) : (
          <CircularProgress />
        )}
      </Paper>
    </div>
  );
};

export default CoinPage;
