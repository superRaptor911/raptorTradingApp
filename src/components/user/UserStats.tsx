import React, {useEffect, useState} from 'react';
import Table from '@mui/material/Table';
import TableBody from '@mui/material/TableBody';
import TableCell from '@mui/material/TableCell';
import TableContainer from '@mui/material/TableContainer';
import TableHead from '@mui/material/TableHead';
import TableRow from '@mui/material/TableRow';
import Paper from '@mui/material/Paper';
import {useStore} from '../../store';
import {humanReadableValue} from '../../utility';
import useDeviceType from '../hooks/useDeviceType';
import {User} from '../../types';

const UserStats = ({user}: {user: User}) => {
  const fundTransfers = useStore(state => state.fundTransfers);
  const loadFundTransfers = useStore(state => state.loadFundTransfers);

  const [totalInvestment, setTotalInvestment] = useState(0);
  const [totalWithdrawl, setTotalWithdrawl] = useState(0);

  const isMobile = 'mobile' === useDeviceType();
  const userBalance = user.wallet.balance;

  useEffect(() => {
    loadFundTransfers();
  }, []);

  useEffect(() => {
    if (user && fundTransfers) {
      let total = 0;
      let withdrawl = 0;
      fundTransfers.forEach(item => {
        if (item.username === user.name) {
          if (item.transType === 'DEPOSIT') {
            total += item.amount;
          } else {
            withdrawl += item.amount - item.fee - item.donation;
          }
        }
      });

      setTotalInvestment(total);
      setTotalWithdrawl(withdrawl);
    }
  }, [user, fundTransfers]);

  return (
    <TableContainer
      component={Paper}
      sx={{
        width: '100%',
        maxWidth: '100%',
        margin: 'auto',
        marginTop: 10,
        marginBottom: 10,
      }}>
      <Table sx={{minWidth: '50vw'}} aria-label="simple table">
        <TableHead>
          <TableRow>
            <TableCell align="center">Wallet</TableCell>
            <TableCell align="center">
              {isMobile ? 'Invst.' : 'Investments Ever'}
            </TableCell>
            <TableCell align="center">
              {isMobile ? 'With.' : 'Withdrawl Ever'}
            </TableCell>
            <TableCell align="center">Net Profit</TableCell>
          </TableRow>
        </TableHead>

        <TableBody>
          <TableRow>
            <TableCell align="center">
              {isMobile
                ? humanReadableValue(userBalance)
                : userBalance.toFixed(2)}
            </TableCell>
            <TableCell align="center">
              {humanReadableValue(totalInvestment)}
            </TableCell>

            <TableCell align="center">
              {humanReadableValue(totalWithdrawl)}
            </TableCell>
            <TableCell
              align="center"
              style={{
                color: totalWithdrawl > totalInvestment ? 'green' : 'red',
              }}>
              {humanReadableValue(totalWithdrawl - totalInvestment)}
            </TableCell>
          </TableRow>
        </TableBody>
      </Table>
    </TableContainer>
  );
};

export default UserStats;
