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
import useDeviceType from './hooks/useDeviceType';
import Visibility from './Visibility';
import {get24HrChange, humanReadableValue} from '../utility';
import {useHistory} from 'react-router-dom';

const getCoinPrice = (prices, coinId) => {
  let coinPrice = prices ? prices[coinId].last : 0;
  coinPrice = parseFloat(coinPrice);
  return coinPrice;
};

const CoinList = () => {
  const coins = useStore(state => state.coins);
  const coinPrices = useStore(state => state.coinPrices);

  const loadCoins = useStore(state => state.loadCoins);
  const loadCoinPrices = useStore(state => state.loadCoinPrices);

  const history = useHistory();

  const isMobile = 'mobile' === useDeviceType();

  useTimer(2000, () => {
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
        width: '90vw',
        maxWidth: 1000,
        margin: 'auto',
        marginTop: 10,
      }}>
      <Table sx={{minWidth: '50vw'}} aria-label="simple table">
        <TableHead>
          <TableRow>
            <TableCell>Coin</TableCell>
            <Visibility hide={isMobile}>
              <TableCell>Coin ID</TableCell>
            </Visibility>
            <TableCell align="center">Current Value</TableCell>
            <TableCell align="right">Delta</TableCell>
          </TableRow>
        </TableHead>

        <TableBody>
          {coins &&
            coins.map((row, id) => (
              <TableRow
                key={id}
                onClick={() => history.push('/coin/' + row.name)}>
                <TableCell
                  component="th"
                  scope="row"
                  sx={{display: 'flex', alignItems: 'center'}}>
                  <Avatar
                    src={row.avatar}
                    alt={row.name}
                    sx={{marginRight: 2}}
                  />
                  <Visibility hide={isMobile}>{row.name}</Visibility>
                </TableCell>
                <Visibility hide={isMobile}>
                  <TableCell>{row.id}</TableCell>
                </Visibility>
                <TableCell align="center">
                  {humanReadableValue(getCoinPrice(coinPrices, row.id))}
                </TableCell>

                <TableCell
                  align="right"
                  sx={{
                    color:
                      get24HrChange(coinPrices, row.id) < 0 ? 'red' : 'green',
                  }}>
                  {get24HrChange(coinPrices, row.id)}%
                </TableCell>
              </TableRow>
            ))}
        </TableBody>
      </Table>
    </TableContainer>
  );
};

export default CoinList;
