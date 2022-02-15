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
import {Transaction, User} from '../../types';
import {getCoinPrice} from '../helper';

// const gg = transactions => {
//   let m = 3970.04;
//   const trans = [...transactions];
//   trans.reverse().forEach(row => {
//     const total = row.cost * row.coinCount + parseFloat(row.fee);
//     if (row.transType === 'BUY') {
//       m -= total;
//     } else {
//       m += total;
//       m -= 2 * row.fee;
//     }
//     console.log(
//       `${row.transType} ${row.coinCount} ${row.coinId} total = ${total}\n Balance: ${m}`,
//     );
//   });
// };

interface UserTransactionProps {
  user: User;
  allTransactions: Transaction[];
  coinId?: string;
}

const RenderRow = (row: Transaction, isMobile: boolean) => {
  const total = row.cost * row.coinCount + row.fee;
  const curPrice = row.coinCount * getCoinPrice(row.coinId);
  const change = curPrice - total;
  return (
    <TableRow key={row._id}>
      <TableCell>{row.coinId}</TableCell>

      <TableCell
        align="center"
        style={{color: row.transType === 'BUY' ? 'green' : 'red'}}>
        {isMobile ? row.transType[0] : row.transType}
      </TableCell>
      <TableCell align="center">
        {isMobile ? humanReadableValue(row.coinCount) : row.coinCount}
      </TableCell>
      <TableCell align="center">
        {isMobile ? humanReadableValue(row.cost) : row.cost}
      </TableCell>
      <TableCell align="center">{humanReadableValue(row.fee)}</TableCell>
      <TableCell align="center">{humanReadableValue(total)}</TableCell>

      <TableCell align="center">
        {row.transType == 'BUY' ? humanReadableValue(curPrice) : '-'}
      </TableCell>

      <TableCell align="center" style={{color: change > 0 ? 'green' : 'red'}}>
        {row.transType == 'BUY' ? humanReadableValue(change) : '-'}
      </TableCell>
    </TableRow>
  );
};

export default function UserTransaction({
  user,
  allTransactions,
  coinId,
}: UserTransactionProps) {
  const [page, setPage] = useState(0);
  const [rowsPerPage, setRowsPerPage] = useState(10);
  const [transactions, setTransactions] = useState<Transaction[]>([]);

  useEffect(() => {
    if (allTransactions) {
      // Filter by username
      let filtered = allTransactions.filter(
        item => item.username === user.name,
      );
      // if coinid filter by coinid
      filtered = coinId
        ? filtered.filter(item => item.coinId == coinId)
        : filtered;
      setTransactions(filtered);
    }
  }, [allTransactions]);

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

  // gg(transactions);
  return (
    <TableContainer
      component={Paper}
      sx={{maxWidth: '95%', margin: 'auto', marginTop: 10, marginBottom: 10}}>
      <Table sx={{minWidth: 500}} aria-label="custom pagination table">
        <TableHead>
          <TableRow>
            <TableCell>Coin</TableCell>
            <TableCell align="center">Type</TableCell>
            <TableCell align="center">Coin Count</TableCell>
            <TableCell align="center">Coin Price</TableCell>
            <TableCell align="center">Fee</TableCell>
            <TableCell align="center">Total</TableCell>
            <TableCell align="center">Cur Val</TableCell>
            <TableCell align="center">Change</TableCell>
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
            ).map(row => RenderRow(row, isMobile))}

          {emptyRows > 0 && (
            <TableRow style={{height: 53 * emptyRows}}>
              <TableCell colSpan={6} />
            </TableRow>
          )}
        </TableBody>
        <TableFooter>
          <TablePagination
            rowsPerPageOptions={[10, 15, 25, {label: 'All', value: -1}]}
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
        </TableFooter>
      </Table>
    </TableContainer>
  );
}
