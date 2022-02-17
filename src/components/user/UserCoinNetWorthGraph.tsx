import React, {useEffect, useState} from 'react';
import {
  ResponsiveContainer,
  BarChart,
  CartesianGrid,
  XAxis,
  YAxis,
  Tooltip,
  Legend,
  Bar,
} from 'recharts';
import {useStore} from '../../store';
import {User} from '../../types';

interface UserCoinWorthGraphProps {
  user: User;
}

const genDataForGraph = (user: User, coinPrices: any) => {
  const coins = user.wallet.coins;
  if (coins) {
    let data = Object.keys(coins).map(item => {
      return {
        coin: item,
        value: Number((coins[item] * coinPrices[item].last).toFixed(2)),
      };
    });

    data.push({
      coin: 'wallet',
      value: Number(user.wallet.balance.toFixed(2)),
    });
    data = data
      .filter(item => item.value > 0)
      .sort((a, b) => b.value - a.value);
    return data;
  }
  return [];
};

const UserCoinNetWorthGraph = ({user}: UserCoinWorthGraphProps) => {
  const [data, setData] = useState<any>([]);
  const coinPrices = useStore(state => state.coinPrices);

  useEffect(() => {
    if (coinPrices) {
      setData(genDataForGraph(user, coinPrices));
    }
  }, [user, coinPrices]);

  return (
    <div style={{fontSize: 12}}>
      <ResponsiveContainer width="100%" height={500}>
        <BarChart width={730} height={250} data={data} layout="horizontal">
          {/* <CartesianGrid strokeDasharray="3 3" /> */}
          <XAxis dataKey="coin" />
          <YAxis />
          <Tooltip />
          <Legend />
          <Bar dataKey="value" fill="#8884d8" />
        </BarChart>
      </ResponsiveContainer>
    </div>
  );
};

export default UserCoinNetWorthGraph;
