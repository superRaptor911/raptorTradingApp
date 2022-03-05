import {
  TableContainer,
  Paper,
  Table,
  TableHead,
  TableRow,
  TableCell,
  TableBody,
  Avatar,
} from '@mui/material';
import {useEffect} from 'react';
import {useHistory} from 'react-router-dom';
import {useStore} from '../store';
import {humanReadableValue} from '../utility';

const Leaderboard = () => {
  const users = useStore(state => state.users);
  const transactions = useStore(state => state.transactions);
  const coinPrices = useStore(state => state.coinPrices);
  const history = useHistory();

  useEffect(() => {
    useStore().loadCoinPrices();
    useStore().loadTransactions();
  }, []);

  return (
    <div>
      <h3>Leaderboard</h3>

      <TableContainer
        component={Paper}
        sx={{
          width: '90vw',
          maxWidth: 1000,
          margin: 'auto',
          marginTop: 10,
        }}>
        <Table sx={{minWidth: '50vw'}} aria-label="simple table">
          <TableHead>
            <TableRow>
              <TableCell>User</TableCell>
              <TableCell align="center">Investment</TableCell>
              <TableCell align="right">Current Value</TableCell>
            </TableRow>
          </TableHead>

          <TableBody>
            {users &&
              users.map((row, id) => (
                <TableRow
                  key={id}
                  onClick={() => history.push('/user/' + row.name)}>
                  <TableCell
                    component="th"
                    scope="row"
                    sx={{display: 'flex', alignItems: 'center'}}>
                    <Avatar
                      src={row.avatar}
                      alt={row.name}
                      sx={{marginRight: 2}}
                    />
                    {row.name}
                  </TableCell>
                  <TableCell align="center">{humanReadableValue(0)}</TableCell>

                  <TableCell align="right">{0}%</TableCell>
                </TableRow>
              ))}
          </TableBody>
        </Table>
      </TableContainer>
    </div>
  );
};

export default Leaderboard;
