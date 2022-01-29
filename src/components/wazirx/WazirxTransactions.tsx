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
import useTimer from '../hooks/useTimer';
import TablePaginationActions from '@mui/material/TablePagination/TablePaginationActions';
import {WazirxCancelOrder, wazirxGetTransactions} from '../../api/wazirxApi';
import {WazirxTransaction} from '../../types';

const WazirxTransactions = () => {
  const [page, setPage] = useState(0);
  const [rowsPerPage, setRowsPerPage] = useState(5);

  const [transactions, setTransactions] = useState<WazirxTransaction[]>([]);

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

  const itemCount = transactions ? transactions.length : 0;
  // Avoid a layout jump when reaching the last page with empty rows.
  const emptyRows =
    page > 0 ? Math.max(0, (1 + page) * rowsPerPage - itemCount) : 0;

  const handleChangePage = (
    _event: React.MouseEvent<HTMLButtonElement> | null,
    newPage: number,
  ) => {
    setPage(newPage);
  };

  const handleChangeRowsPerPage = (
    event: React.ChangeEvent<HTMLInputElement>,
  ) => {
    setRowsPerPage(parseInt(event.target.value, 10));
    setPage(0);
  };

  const getFilteredTransaction = () => {
    if (rowsPerPage > 0) {
      return transactions
        .map((_e, i, a) => a[a.length - 1 - i]) // Non inplace reverse
        .slice(page * rowsPerPage, page * rowsPerPage + rowsPerPage);
    }

    return transactions.map((_e, i, a) => a[a.length - 1 - i]); // Non inplace reverse
  };

  const cancelOrder = (coinId: string, orderId: string) => {
    WazirxCancelOrder(coinId, orderId);
  };

  return (
    <TableContainer
      component={Paper}
      sx={{maxWidth: 1000, margin: 'auto', marginTop: 10}}>
      <Table sx={{minWidth: 500}} aria-label="custom pagination table">
        <TableHead>
          <TableRow>
            <TableCell>Coin</TableCell>
            <TableCell>Coin Count</TableCell>
            <TableCell>Coin Price</TableCell>
            <TableCell>Type</TableCell>
            <TableCell>Status</TableCell>
            <TableCell>Control</TableCell>
          </TableRow>
        </TableHead>
        <TableBody>
          {transactions &&
            getFilteredTransaction().map(row => (
              <TableRow key={row.id}>
                <TableCell>{row.receipt.symbol}</TableCell>
                <TableCell>{row.receipt.origQty}</TableCell>
                <TableCell>{row.receipt.price}</TableCell>
                <TableCell
                  style={{
                    color: row.receipt.side === 'buy' ? 'green' : 'red',
                  }}>
                  {row.receipt.side}
                </TableCell>
                <TableCell>{row.receipt.status}</TableCell>
                <TableCell>
                  <Button
                    onClick={() => {
                      cancelOrder(row.receipt.symbol, row.id);
                    }}
                    disabled={row.status !== 'PENDING'}
                    sx={{marginLeft: 'auto', color: 'red'}}>
                    Cancel
                  </Button>
                </TableCell>
              </TableRow>
            ))}
          {emptyRows > 0 && (
            <TableRow style={{height: 53 * emptyRows}}>
              <TableCell colSpan={6} />
            </TableRow>
          )}
        </TableBody>
        <TableFooter>
          <TableRow>
            <TablePagination
              rowsPerPageOptions={[5, 10, 15, {label: 'All', value: -1}]}
              colSpan={3}
              count={itemCount}
              rowsPerPage={rowsPerPage}
              page={page}
              SelectProps={{
                inputProps: {
                  'aria-label': 'rows per page',
                },
                native: true,
              }}
              onPageChange={handleChangePage}
              onRowsPerPageChange={handleChangeRowsPerPage}
              ActionsComponent={TablePaginationActions}
            />
          </TableRow>
        </TableFooter>
      </Table>
    </TableContainer>
  );
};

export default WazirxTransactions;
