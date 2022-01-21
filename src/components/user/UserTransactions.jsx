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
import {humanReadableValue} from '../../utility';
import {TableHead} from '@mui/material';
import useDeviceType from '../hooks/useDeviceType';
import TablePaginationActions from '@mui/material/TablePagination/TablePaginationActions';

const gg = transactions => {
  let m = 3970.04;
  const trans = [...transactions];
  trans.reverse().forEach(row => {
    const total = row.cost * row.coinCount + parseFloat(row.fee);
    if (row.transType === 'BUY') {
      m -= total;
    } else {
      m += total;
      m -= 2 * row.fee;
    }
    console.log(
      `${row.transType} ${row.coinCount} ${row.coinId} total = ${total}\n Balance: ${m}`,
    );
  });
};

export default function UserTransaction({user, allTransactions}) {
  const [page, setPage] = useState(0);
  const [rowsPerPage, setRowsPerPage] = useState(10);

  const [transactions, setTransactions] = useState([]);

  useEffect(() => {
    if (allTransactions) {
      setTransactions(
        allTransactions.filter(item => item.username === user.name),
      );
    }
  }, [allTransactions]);

  const isMobile = 'mobile' === useDeviceType();
  const itemCount = transactions ? transactions.length : 0;
  const emptyRows =
    page > 0 ? Math.max(0, (1 + page) * rowsPerPage - itemCount) : 0;

  const handleChangePage = (event, newPage) => {
    setPage(newPage);
  };

  const handleChangeRowsPerPage = event => {
    setRowsPerPage(parseInt(event.target.value, 10));
    setPage(0);
  };

  gg(transactions);
  return (
    <TableContainer
      component={Paper}
      sx={{maxWidth: '95%', margin: 'auto', marginTop: 10, marginBottom: 10}}>
      <Table sx={{minWidth: 500}} aria-label="custom pagination table">
        <TableHead>
          <TableRow>
            <TableCell>Coin</TableCell>
            <TableCell>Type</TableCell>
            <TableCell align="center">Coin Count</TableCell>
            <TableCell align="center">Coin Price</TableCell>
            <TableCell align="center">Fee</TableCell>
            <TableCell align="center">Total</TableCell>
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
                <TableCell>{row.coinId}</TableCell>

                <TableCell
                  style={{color: row.transType === 'BUY' ? 'green' : 'red'}}>
                  {isMobile ? row.transType[0] : row.transType}
                </TableCell>
                <TableCell align="center">
                  {isMobile ? humanReadableValue(row.coinCount) : row.coinCount}
                </TableCell>
                <TableCell align="center">
                  {isMobile ? humanReadableValue(row.cost) : row.cost}
                </TableCell>
                <TableCell align="center">
                  {humanReadableValue(row.fee)}
                </TableCell>
                <TableCell align="center">
                  {humanReadableValue(
                    row.cost * row.coinCount + parseFloat(row.fee),
                  )}
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
              ActionsComponent={TablePaginationActions}
            />
          </TableRow>
        </TableFooter>
      </Table>
    </TableContainer>
  );
}
