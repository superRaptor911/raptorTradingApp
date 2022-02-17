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
import {useStore} from '../../store';
import TableCustomPaginationAction from '../TableCustomPaginationAction';
import {FundTransfer, User} from '../../types';

export default function UserFundTransferList({user}: {user: User}) {
  const [page, setPage] = useState(0);
  const [rowsPerPage, setRowsPerPage] = useState(10);

  const [transactions, setTransactions] = useState<FundTransfer[]>([]);
  const fundTransfers = useStore(state => state.fundTransfers);

  useEffect(() => {
    if (fundTransfers && user) {
      setTransactions(
        fundTransfers.filter(item => item.username === user.name).reverse(),
      );
    }
  }, [fundTransfers]);

  const isMobile = 'mobile' === useDeviceType();
  const itemCount = transactions ? transactions.length : 0;
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
      sx={{maxWidth: '95%', margin: 'auto', marginTop: 10, marginBottom: 10}}>
      <Table sx={{minWidth: 500}} aria-label="custom pagination table">
        <TableHead>
          <TableRow>
            <TableCell>Type</TableCell>
            <TableCell align="center">Amount</TableCell>
            <TableCell align="center">Fee</TableCell>
            <TableCell align="center">Donation</TableCell>
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
                <TableCell
                  style={{
                    color: row.transType === 'DEPOSIT' ? 'green' : 'red',
                  }}>
                  {isMobile ? row.transType[0] : row.transType}
                </TableCell>
                <TableCell align="center">
                  {isMobile
                    ? humanReadableValue(row.amount)
                    : row.amount.toFixed(2)}
                </TableCell>
                <TableCell align="center">
                  {humanReadableValue(row.fee)}
                </TableCell>
                <TableCell align="center">
                  {isMobile ? humanReadableValue(row.donation) : row.donation}
                </TableCell>
                <TableCell align="center">
                  {(row.amount - row.donation - row.fee).toFixed(2)}
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
