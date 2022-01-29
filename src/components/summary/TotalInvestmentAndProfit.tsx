import React from 'react';
import {useStore} from '../../store';
import Table from '@mui/material/Table';
import TableBody from '@mui/material/TableBody';
import TableCell from '@mui/material/TableCell';
import TableContainer from '@mui/material/TableContainer';
import TableHead from '@mui/material/TableHead';
import TableRow from '@mui/material/TableRow';
import Paper from '@mui/material/Paper';
import {humanReadableValue} from '../../utility';
import useDeviceType from '../hooks/useDeviceType';
import Visibility from '../Visibility';

const TotalInvestmentAndProfit = () => {
  const users = useStore(state => state.users);
  const coins = useStore(state => state.coins);
  const coinPrices = useStore(state => state.coinPrices);

  let totalInvestment = 0;
  let curVal = 0;
  let wallet = 0;

  const isMobile = 'mobile' === useDeviceType();

  if (users) {
    users.forEach(user => {
      totalInvestment += user.wallet.investment;
      wallet += user.wallet.balance;
    });

    if (coinPrices && coins) {
      users.forEach(user => {
        for (const i in user.wallet.coins) {
          const count = user.wallet.coins[i];
          const value = parseFloat(coinPrices[i].last);

          curVal += count * value;
        }
      });
    }
  }

  const profit = curVal - totalInvestment;
  return (
    <TableContainer
      component={Paper}
      sx={{
        width: 'max-content',
        maxWidth: '95vw',
        margin: 'auto',
        marginTop: 10,
      }}>
      <Table sx={{minWidth: '50vw'}} aria-label="simple table">
        <TableHead>
          <TableRow>
            <TableCell>Total Investment</TableCell>
            <TableCell>Wallet</TableCell>
            <TableCell>Current value</TableCell>
            <Visibility hide={isMobile}>
              <TableCell>Profit</TableCell>
            </Visibility>
            <TableCell>Profit %</TableCell>
          </TableRow>
        </TableHead>

        <TableBody>
          <TableRow>
            <TableCell>{humanReadableValue(totalInvestment)}</TableCell>

            <TableCell>{wallet.toFixed(2)}</TableCell>
            <TableCell>{humanReadableValue(curVal)}</TableCell>

            <Visibility hide={isMobile}>
              <TableCell sx={{color: profit < 0 ? 'red' : 'green'}}>
                {humanReadableValue(profit)}
              </TableCell>
            </Visibility>

            <TableCell sx={{color: profit < 0 ? 'red' : 'green'}}>
              {((100 * profit) / totalInvestment).toFixed(2)}%
            </TableCell>
          </TableRow>
        </TableBody>
      </Table>
    </TableContainer>
  );
};

export default TotalInvestmentAndProfit;
