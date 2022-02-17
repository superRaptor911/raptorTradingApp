import {MenuItem, Select} from '@mui/material';
import React, {useEffect, useState} from 'react';
import {
  LineChart,
  Line,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
  Legend,
  ResponsiveContainer,
} from 'recharts';
import {Transaction} from '../../types';

interface UserTradesGraphProps {
  userTransactions: Transaction[];
  coinId?: string;
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

const UserTradesGraph = ({userTransactions, coinId}: UserTradesGraphProps) => {
  const [data, setData] = useState<any>([]);
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
      const newData = userTransactions
        .filter(item => item.coinId == selectedCoin)
        .map(item => {
          return {
            uv: item.cost,
            name: `${item.coinCount} ${item.coinId}`,
          };
        });

      setData(newData);
    }
  }, [selectedCoin]);

  return (
    <div>
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
      <ResponsiveContainer width="100%" height={500}>
        <LineChart
          width={500}
          height={300}
          data={data}
          margin={{
            top: 5,
            right: 10,
            left: 10,
            bottom: 5,
          }}>
          <CartesianGrid strokeDasharray="3 3" />
          <XAxis dataKey="name" />
          <YAxis domain={['dataMin', 'dataMax']} />
          <Tooltip />
          <Legend />
          <Line
            type="monotone"
            dataKey="uv"
            stroke="#8884d8"
            activeDot={{r: 8}}
          />
        </LineChart>
      </ResponsiveContainer>
    </div>
  );
};

export default UserTradesGraph;
