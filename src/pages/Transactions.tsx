/* eslint-disable react/prop-types */
import React, {useEffect, useState} from 'react';
import {useStore} from '../store';
import Table from '@mui/material/Table';
import TableBody from '@mui/material/TableBody';
import TableCell from '@mui/material/TableCell';
import TableContainer from '@mui/material/TableContainer';
import TableFooter from '@mui/material/TableFooter';
import TablePagination from '@mui/material/TablePagination';
import TableRow from '@mui/material/TableRow';
import Paper from '@mui/material/Paper';
import {fixedNumber, humanReadableValue} from '../utility';
import {TableHead} from '@mui/material';
import TableCustomPaginationAction from '../components/TableCustomPaginationAction';

export default function TransactionPage() {
  const [page, setPage] = useState(0);
  const [rowsPerPage, setRowsPerPage] = useState(10);

  const transactions = useStore(state => state.transactions);
  const loadTransactions = useStore(state => state.loadTransactions);

  useEffect(() => {
    if (loadTransactions) {
      loadTransactions();
    }
  }, [loadTransactions]);

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

  return (
    <TableContainer
      component={Paper}
      sx={{maxWidth: 1000, margin: 'auto', marginTop: 10}}>
      <Table sx={{minWidth: 500}} aria-label="custom pagination table">
        <TableHead>
          <TableRow>
            <TableCell>Name</TableCell>
            <TableCell>Coin</TableCell>
            <TableCell>Type</TableCell>
            <TableCell>Coin Count</TableCell>
            <TableCell align="right">Coin Price</TableCell>
            <TableCell align="right">Fee</TableCell>
            <TableCell align="right">Total</TableCell>
          </TableRow>
        </TableHead>
        <TableBody>
          {transactions &&
            (rowsPerPage > 0
              ? transactions.slice(
                  page * rowsPerPage,
                  page * rowsPerPage + rowsPerPage,
                )
              : transactions
            ).map(row => (
              <TableRow key={row._id}>
                <TableCell>{row.username}</TableCell>
                <TableCell>{row.coinId}</TableCell>

                <TableCell
                  style={{color: row.transType === 'BUY' ? 'green' : 'red'}}>
                  {row.transType}
                </TableCell>
                <TableCell align="center">{row.coinCount}</TableCell>
                <TableCell align="right">{row.cost}</TableCell>
                <TableCell align="right">
                  {humanReadableValue(row.fee)}
                </TableCell>
                <TableCell align="right">
                  {fixedNumber(row.cost * row.coinCount + row.fee).toFixed(2)}
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
              rowsPerPageOptions={[10, 15, 25, {label: 'All', value: -1}]}
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
              ActionsComponent={TableCustomPaginationAction}
            />
          </TableRow>
        </TableFooter>
      </Table>
    </TableContainer>
  );
}
