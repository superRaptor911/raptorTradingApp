import React, {useEffect, useState} from 'react';
import {useStore} from '../../store';
import Table from '@mui/material/Table';
import Avatar from '@mui/material/Avatar';
import TableBody from '@mui/material/TableBody';
import TableCell from '@mui/material/TableCell';
import TableContainer from '@mui/material/TableContainer';
import TableHead from '@mui/material/TableHead';
import TableRow from '@mui/material/TableRow';
import Paper from '@mui/material/Paper';
import {fixedNumber, humanReadableValue} from '../../utility';
import useDeviceType from '../hooks/useDeviceType';

const TotalCoins = () => {
  const users = useStore(state => state.users);
  const coins = useStore(state => state.coins);
  const [coinsList, setCoinsList] = useState<{[key: string]: number}>({});

  const isMobile = 'mobile' === useDeviceType();

  useEffect(() => {
    const coinMap: {[key: string]: number} = {};

    if (coins && users) {
      coins.forEach(item => {
        coinMap[item.id] = 0;
      });

      users.forEach(user => {
        const userCoins = user.wallet.coins;
        for (const i in userCoins) {
          coinMap[i] += userCoins[i];
        }
      });
    }
    setCoinsList(coinMap);
  }, [coins, users]);

  return (
    <TableContainer
      component={Paper}
      sx={{
        width: 'max-content',
        maxWidth: '95vw',
        margin: 'auto',
        marginTop: 10,
        marginBottom: 10,
      }}>
      <Table
        sx={{minWidth: isMobile ? '95vw' : '50vw'}}
        aria-label="simple table">
        <TableHead>
          <TableRow>
            <TableCell>Coin</TableCell>
            <TableCell align="center">Count</TableCell>
          </TableRow>
        </TableHead>

        <TableBody>
          {coins &&
            coins.map(item => (
              <TableRow key={item.id}>
                <TableCell>
                  <div
                    style={{
                      display: 'flex',
                      alignItems: 'center',
                    }}>
                    <Avatar
                      src={item.avatar}
                      alt={item.name}
                      sx={{marginRight: 2}}
                    />
                    {item.name}
                  </div>
                </TableCell>
                <TableCell align="center">
                  {isMobile
                    ? humanReadableValue(coinsList[item.id])
                    : fixedNumber(coinsList[item.id])}
                </TableCell>
              </TableRow>
            ))}
        </TableBody>
      </Table>
    </TableContainer>
  );
};

export default TotalCoins;
