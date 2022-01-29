import React, {Fragment} from 'react';
import TableCell from '@mui/material/TableCell';
import {humanReadableValue} from '../../utility';

interface UserCoinStatsProps {
  coinId: string;
  count: number;
  prices: any;
  isMobile: boolean;
  coinInvestment: {[key: string]: number};
}

const UserCoinStats = ({
  coinId,
  count,
  prices,
  coinInvestment,
  isMobile,
}: UserCoinStatsProps) => {
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

export default UserCoinStats;
