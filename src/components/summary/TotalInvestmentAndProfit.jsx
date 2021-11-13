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

const TotalInvestmentAndProfit = () => {
  const users = useStore(state => state.users);
  const coins = useStore(state => state.coins);
  const coinPrices = useStore(state => state.coinPrices);

  let totalInvestment = 0;
  let curVal = 0;

  if (users) {
    users.forEach(user => {
      totalInvestment += parseFloat(user.wallet.investment);
    });

    if (coinPrices && coins) {
      let cids = {};
      coins.forEach(item => {
        cids[item.name] = item.id;
      });

      users.forEach(user => {
        for (const i in user.wallet.coins) {
          const count = parseFloat(user.wallet.coins[i].count);
          const value = parseFloat(coinPrices[cids[i]].last);

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
        margin: 'auto',
        marginTop: 10,
      }}>
      <Table sx={{minWidth: '50vw'}} aria-label="simple table">
        <TableHead>
          <TableRow>
            <TableCell>Total Investment</TableCell>
            <TableCell>Current value</TableCell>
            <TableCell>Profit</TableCell>
            <TableCell>Profit %</TableCell>
          </TableRow>
        </TableHead>

        <TableBody>
          <TableRow>
            <TableCell>{humanReadableValue(totalInvestment)}</TableCell>

            <TableCell>{humanReadableValue(curVal)}</TableCell>

            <TableCell sx={{color: profit < 0 ? 'red' : 'green'}}>
              {humanReadableValue(profit)}
            </TableCell>

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