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
import useTimer from './hooks/useTimer';

const getCoinPrice = (prices, coinId) => {
  let coinPrice = prices ? prices[coinId].last : 0;
  coinPrice = parseFloat(coinPrice);

  if (coinPrice > 1000) {
    coinPrice = (coinPrice / 1000).toFixed(2) + 'K';
  } else if (coinPrice > 0 && coinPrice < 0.001) {
    coinPrice = (coinPrice * 1000).toFixed(2) + 'm';
  } else {
    coinPrice = coinPrice.toFixed(2);
  }
  return coinPrice;
};

const CoinList = () => {
  const coins = useStore(state => state.coins);
  const coinPrices = useStore(state => state.coinPrices);

  const loadCoins = useStore(state => state.loadCoins);
  const loadCoinPrices = useStore(state => state.loadCoinPrices);

  const cl = useTimer(2000, () => {
    loadCoinPrices();
  });

  useEffect(() => {
    loadCoinPrices();
    loadCoins();
  }, []);

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
            <TableCell align="right">Coin ID</TableCell>
            <TableCell align="right">Current Value</TableCell>
          </TableRow>
        </TableHead>

        <TableBody>
          {coins &&
            coins.map((row, id) => (
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
                <TableCell align="right">{row.id}</TableCell>
                <TableCell align="right">
                  {getCoinPrice(coinPrices, row.id)}
                </TableCell>
              </TableRow>
            ))}
        </TableBody>
      </Table>
    </TableContainer>
  );
};

export default CoinList;
