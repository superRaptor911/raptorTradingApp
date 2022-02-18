import {MenuItem, Select} from '@mui/material';
import React, {useEffect, useState} from 'react';
import {
  Brush,
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

const getBuyAndSellData = (transactions: Transaction[], coinId: string) => {
  const buyTrades: TradeData[] = [];
  const sellTrades: TradeData[] = [];
  const filteredTrans = transactions.filter(item => item.coinId == coinId);
  let i = 0;
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

  return [buyTrades, sellTrades];
};

const UserTradesGraph = ({userTransactions, coinId}: UserTradesGraphProps) => {
  const [buyData, setBuyData] = useState<TradeData[]>([]);
  const [sellData, setSellData] = useState<TradeData[]>([]);
  const [userCoins, setUserCoins] = useState<string[]>([]);
  const [selectedCoin, setSelectedCoin] = useState('');

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
      const [buyTrades, sellTrades] = getBuyAndSellData(
        userTransactions,
        selectedCoin,
      );
      console.log(buyTrades, sellTrades);
      setBuyData(buyTrades);
      setSellData(sellTrades);
    }
  }, [selectedCoin]);

  return (
    <div style={{fontSize: 12, marginBottom: 40, marginTop: 30}}>
      <div style={{margin: 'auto', width: 'max-content'}}>
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
            unit="s"
            type="number"
            domain={['dataMin - 1', 'dataMax + 1']}
          />
          <YAxis
            dataKey="price"
            name="Price"
            unit=" inr"
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
          <Scatter name="Buy" data={buyData} fill="green" />
          <Scatter name="Sell" data={sellData} fill="red" />

          {/* {data.length > 10 && <Brush />} */}
        </ScatterChart>
      </ResponsiveContainer>
    </div>
  );
};

export default UserTradesGraph;
