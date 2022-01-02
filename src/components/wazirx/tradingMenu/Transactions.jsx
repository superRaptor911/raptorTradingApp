/* eslint-disable react/prop-types */
import React, {useEffect, useState} from 'react';
import Table from '@mui/material/Table';
import TableBody from '@mui/material/TableBody';
import TableCell from '@mui/material/TableCell';
import TableContainer from '@mui/material/TableContainer';
import TableFooter from '@mui/material/TableFooter';
import TablePagination from '@mui/material/TablePagination';
import TableRow from '@mui/material/TableRow';
import Paper from '@mui/material/Paper';
import {Button, TableHead} from '@mui/material';
import useTimer from '../../hooks/useTimer';
import TablePaginationActions from '@mui/material/TablePagination/TablePaginationActions';
import {WazirxCancelOrder, wazirxGetTransactions} from '../../../api/wazirxApi';

const Transactions = () => {
  const [transactions, setTransactions] = useState([]);

  useTimer(1500, () => {
    wazirxGetTransactions().then(response => {
      if (response && response.status) {
        setTransactions(response.data);
      }
    });
  });

  useEffect(() => {
    wazirxGetTransactions().then(response => {
      if (response && response.status) {
        setTransactions(response.data);
      }
    });
  }, []);

  const getFilteredTransaction = () => {
    return transactions.map((e, i, a) => a[a.length - 1 - i]); // Non inplace reverse
  };

  const cancelOrder = (coinId, orderId) => {
    WazirxCancelOrder(coinId, orderId);
  };

  return (
    <TableContainer
      component={Paper}
      sx={{width: 'max-content', height: '50vh'}}>
      <Table sx={{width: 400}} aria-label="custom pagination table">
        <TableHead>
          <TableRow>
            <TableCell>Coin</TableCell>
            <TableCell>Coin Count</TableCell>
            <TableCell>Coin Price</TableCell>
            <TableCell>Status</TableCell>
          </TableRow>
        </TableHead>
        <TableBody>
          {transactions &&
            getFilteredTransaction().map(row => (
              <TableRow
                key={row.id}
                style={{
                  backgroundColor:
                    row.receipt.side === 'buy'
                      ? 'rgba(30, 255, 30, 0.2)'
                      : 'rgba(255, 30, 30, 0.2)',
                }}>
                <TableCell>{row.receipt.symbol}</TableCell>
                <TableCell>{row.receipt.origQty}</TableCell>
                <TableCell>{row.receipt.price}</TableCell>
                <TableCell>{row.receipt.status}</TableCell>
              </TableRow>
            ))}
        </TableBody>
        <TableFooter></TableFooter>
      </Table>
    </TableContainer>
  );
};

export default Transactions;
