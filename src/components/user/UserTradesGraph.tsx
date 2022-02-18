import {MenuItem, Select, Typography} from '@mui/material';
import Checkbox from '@mui/material/Checkbox';
import React, {useEffect, useState} from 'react';
import {
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
  Legend,
  ResponsiveContainer,
  Scatter,
  ScatterChart,
  ZAxis,
} from 'recharts';
import {Transaction} from '../../types';
import Visibility from '../Visibility';

interface UserTradesGraphProps {
  userTransactions: Transaction[];
  coinId?: string;
}

interface TradeData {
  amount: number;
  price: number;
  id: number;
}

const getCoinsFromTransactions = (transactions: Transaction[]) => {
  const coins: string[] = [];
  const coinMap: any = {};

  transactions.forEach(item => {
    const exists = coinMap[item.coinId];
    coinMap[item.coinId] = true;
    if (!exists) {
      coins.push(item.coinId);
    }
  });

  return coins;
};

const normalizeTransactions = (transactions: Transaction[]) => {
  let max = 0;
  transactions.forEach(item => (max = Math.max(max, item.cost)));
  const newTransactions = transactions.map(item => {
    const newItem = {...item};
    newItem.cost /= max / 100;
    newItem.cost = Number(newItem.cost.toFixed(1));
    return newItem;
  });
  return newTransactions;
};

const getBuyAndSellData = (
  transactions: Transaction[],
  coinId: string,
  normalize: boolean,
) => {
  const buyTrades: TradeData[] = [];
  const sellTrades: TradeData[] = [];
  let filteredTrans = transactions
    .filter(item => item.coinId == coinId)
    .reverse();

  if (normalize) {
    filteredTrans = normalizeTransactions(filteredTrans);
  }

  let i = 1;
  filteredTrans.forEach(item => {
    const tradeData: TradeData = {
      amount: item.coinCount,
      price: item.cost,
      id: i++,
    };
    item.transType == 'SELL'
      ? sellTrades.push(tradeData)
      : buyTrades.push(tradeData);
  });

  return {buyTrades: buyTrades, sellTrades: sellTrades, count: i};
};

const UserTradesGraph = ({userTransactions, coinId}: UserTradesGraphProps) => {
  const [buyData, setBuyData] = useState<TradeData[]>([]);
  const [sellData, setSellData] = useState<TradeData[]>([]);
  const [userCoins, setUserCoins] = useState<string[]>([]);
  const [selectedCoin, setSelectedCoin] = useState('');
  const [normalize, setNormalize] = useState(false);

  useEffect(() => {
    const coins = getCoinsFromTransactions(userTransactions);
    setUserCoins(coins);
    if (coinId) {
      setSelectedCoin(coinId);
    } else if (coins.length > 0) {
      setSelectedCoin(coins[0]);
    }
  }, [userTransactions, coinId]);

  useEffect(() => {
    if (selectedCoin != '') {
      const {buyTrades, sellTrades} = getBuyAndSellData(
        userTransactions,
        selectedCoin,
        normalize,
      );
      setBuyData(buyTrades);
      setSellData(sellTrades);
    }
  }, [selectedCoin, normalize]);

  return (
    <div style={{fontSize: 12, marginBottom: 40, marginTop: 30}}>
      <Typography variant="h4" textAlign="center" sx={{marginBottom: 2}}>
        Trades for {selectedCoin}
      </Typography>

      <div style={{margin: 'auto', width: 'max-content'}}>
        <Visibility hide={Boolean(coinId)}>
          <Select
            labelId="name-label"
            value={selectedCoin}
            label="Coin"
            onChange={e => setSelectedCoin(e.target.value)}>
            {userCoins.map(item => (
              <MenuItem value={item} key={item}>
                {item}
              </MenuItem>
            ))}
          </Select>
        </Visibility>
        {'  '}Normalize
        <Checkbox
          checked={normalize}
          onChange={e => setNormalize(e.target.checked)}
        />
      </div>
      <ResponsiveContainer width="100%" height={500}>
        <ScatterChart
          width={730}
          height={250}
          margin={{top: 20, right: 20, bottom: 10, left: 10}}>
          <CartesianGrid strokeDasharray="3 3" />
          <XAxis
            dataKey="id"
            name="ID"
            type="number"
            domain={['dataMin - 1', 'dataMax + 1']}
          />
          <YAxis
            dataKey="price"
            name="Price"
            unit={normalize ? ' %' : ' inr'}
            domain={['dataMin', 'dataMax']}
          />
          <ZAxis
            dataKey="amount"
            range={[10, 500]}
            name="Amount"
            unit={' ' + selectedCoin}
          />
          <Tooltip cursor={{strokeDasharray: '3 3'}} />
          <Legend />
          <Scatter name="Buy" data={buyData} fill="green" line />
          <Scatter name="Sell" data={sellData} fill="red" line />
          {/* <Brush dataKey="id" height={30} stroke="#8884d8" /> */}
        </ScatterChart>
      </ResponsiveContainer>
    </div>
  );
};

export default UserTradesGraph;
