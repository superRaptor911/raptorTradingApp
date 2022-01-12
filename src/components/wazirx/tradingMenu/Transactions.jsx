/* eslint-disable react/prop-types */
import React, {useEffect, useState} from 'react';
import Table from '@mui/material/Table';
import TableBody from '@mui/material/TableBody';
import TableCell from '@mui/material/TableCell';
import TableContainer from '@mui/material/TableContainer';
import TableFooter from '@mui/material/TableFooter';
import TableRow from '@mui/material/TableRow';
import Paper from '@mui/material/Paper';
import {TableHead} from '@mui/material';
import useTimer from '../../hooks/useTimer';
import {wazirxGetTransactions} from '../../../api/wazirxApi';
import {useStore} from '../../../store';

const changeInTrans = (newTrans, oldTrans) => {
  if (oldTrans.length !== newTrans.length) {
    return true;
  }

  for (let i = 0; i < newTrans.length; i++) {
    if (oldTrans[i].status !== newTrans[i].status) {
      return true;
    }
  }

  return false;
};

const Transactions = () => {
  const [transactions, setTransactions] = useState([]);
  const loadUsers = useStore(state => state.loadUsers);

  useTimer(1500, () => {
    wazirxGetTransactions().then(response => {
      if (response && response.status) {
        if (changeInTrans(response.data, transactions)) {
          loadUsers();
        }
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
                <TableCell>
                  <div style={{fontSize: 13, textAlign: 'center'}}>
                    <div style={{borderBottom: '1px solid black'}}>
                      {row.receipt.executedQty}
                    </div>
                    <div>{row.receipt.origQty}</div>
                  </div>
                </TableCell>
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
