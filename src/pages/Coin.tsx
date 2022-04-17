import {useEffect, useState} from 'react';
import Paper from '@mui/material/Paper';
import Typography from '@mui/material/Typography';
import {useParams} from 'react-router-dom';
import {useStore} from '../store';
import {Avatar} from '@mui/material';
import Table from '@mui/material/Table';
import TableBody from '@mui/material/TableBody';
import TableCell from '@mui/material/TableCell';
import TableContainer from '@mui/material/TableContainer';
import TableHead from '@mui/material/TableHead';
import TableRow from '@mui/material/TableRow';
import {
  get24HrChange,
  getCoin,
  getCoinPrice,
  getWazirxUser,
} from '../components/helper';
import {Coin, Transaction} from '../types';
import CoinGraph from '../components/coin/CoinGraph';
import Loading from '../components/Loading';
import UserTransaction from '../components/user/UserTransactions';
import StopLossBot4Coin from '../components/coin/StopLossBot4Coin';
import CoinBuyMenu from '../components/coin/CoinBuyMenu';
import useTimer from '../components/hooks/useTimer';
import UserTradesGraph from '../components/user/UserTradesGraph';
import Visibility from '../components/Visibility';

interface CoinDetailsProp {
  coin: Coin;
}

const CoinDetails = ({coin}: CoinDetailsProp) => {
  return (
    <TableContainer
      component={Paper}
      sx={{
        width: '90vw',
        maxWidth: 1200,
        margin: 'auto',
        marginTop: 10,
      }}>
      <Table sx={{minWidth: '50vw'}} aria-label="simple table">
        <TableHead>
          <TableRow>
            <TableCell>Coin</TableCell>
            <TableCell>Coin ID</TableCell>
            <TableCell align="center">Current Value</TableCell>
            <TableCell align="right">Delta</TableCell>
          </TableRow>
        </TableHead>

        <TableBody>
          <TableRow>
            <TableCell
              component="th"
              scope="row"
              sx={{display: 'flex', alignItems: 'center'}}>
              <Avatar src={coin.avatar} alt={coin.name} sx={{marginRight: 2}} />
              {coin.name}
            </TableCell>
            <TableCell>{coin.id}</TableCell>
            <TableCell align="center">{getCoinPrice(coin.id)}</TableCell>

            <TableCell
              align="right"
              sx={{
                color: get24HrChange(coin.id) < 0 ? 'red' : 'green',
              }}>
              {get24HrChange(coin.id)}%
            </TableCell>
          </TableRow>
        </TableBody>
      </Table>
    </TableContainer>
  );
};

const CoinPage = () => {
  const {coinName}: {coinName: string} = useParams();
  const [coin, setCoin] = useState<Coin | null>();
  const [userTransactions, setUserTransactions] = useState<Transaction[]>([]);

  const coins = useStore(state => state.coins);
  const loadCoinPrices = useStore(state => state.loadCoinPrices);
  const transactions = useStore(state => state.transactions);
  const loadTransactions = useStore(state => state.loadTransactions);
  const user = getWazirxUser();

  useEffect(() => {
    setCoin(getCoin(coins, coinName));
  }, [coinName]);

  useEffect(() => {
    if (user) {
      const list = transactions.filter(item => item.username == user.name);
      setUserTransactions(list);
    }
  }, [transactions]);

  // Load coin price and transaction list every 2000 ms
  useTimer(2000, () => {
    loadTransactions();
    loadCoinPrices();
  });

  if (!coin) {
    return <Loading marginTop={20} />;
  }

  return (
    <div
      style={{
        width: 'max-content',
        margin: 'auto',
        marginTop: 50,
        maxWidth: '100vw',
      }}>
      <Paper
        sx={{
          paddingTop: 5,
          maxWidth: '95vw',
          margin: 'auto',
          marginBottom: 10,
        }}>
        <Avatar
          src={coin.avatar}
          alt={coin.name}
          sx={{width: 128, height: 128, margin: 'auto'}}
        />
        <Typography sx={{textAlign: 'center'}}>{coin.name}</Typography>
        <div style={{marginTop: 30}}>
          <CoinGraph coinId={coin.id} />

          <Visibility hide={!user}>
            <CoinBuyMenu coinId={coin.id} />
          </Visibility>

          <CoinDetails coin={coin} />
          <Visibility hide={!user}>
            <UserTransaction
              allTransactions={transactions}
              user={user}
              coinId={coin.id}
            />
            <UserTradesGraph
              userTransactions={userTransactions}
              coinId={coin.id}
            />
            <StopLossBot4Coin coinId={coin.id} />
          </Visibility>
        </div>
      </Paper>
    </div>
  );
};

export default CoinPage;
