/* eslint-disable react/prop-types */
import {Button, Paper, Typography} from '@mui/material';
import {format} from 'date-fns';
import React, {useEffect, useState} from 'react';
import {
  ComposedChart,
  XAxis,
  Area,
  YAxis,
  CartesianGrid,
  Tooltip,
} from 'recharts';
import {WazirxGetCoinHistory} from '../../../api/wazirxApi';

// const periods = {
//     ""
// }

const MarketGraph = ({coinId}) => {
  const [data, setData] = useState([]);
  const [period, setPeriod] = useState(60);

  useEffect(() => {
    WazirxGetCoinHistory(coinId, period).then(result => {
      const newData = result.map(item => {
        const price = parseFloat(item[4]);
        const timeStr = format(new Date(item[0] * 1000), 'hh:mm');
        return {name: timeStr, price: price};
      });
      setData(newData);
    });
  }, [coinId, period]);

  return (
    <div>
      <Paper style={{display: 'flex', margin: 'auto', width: 'max-content'}}>
        <Button
          variant="text"
          color={period == 30 ? 'primary' : 'secondary'}
          onClick={() => setPeriod(30)}>
          30min
        </Button>
        <Button
          variant="text"
          color={period == 60 ? 'primary' : 'secondary'}
          onClick={() => setPeriod(60)}>
          1H
        </Button>

        <Button
          variant="text"
          color={period == 120 ? 'primary' : 'secondary'}
          onClick={() => setPeriod(120)}>
          2H
        </Button>
        <Button
          variant="text"
          color={period == 240 ? 'primary' : 'secondary'}
          onClick={() => setPeriod(240)}>
          4H
        </Button>

        <Button
          variant="text"
          color={period == 720 ? 'primary' : 'secondary'}
          onClick={() => setPeriod(720)}>
          12H
        </Button>
        <Button
          variant="text"
          color={period == 1440 ? 'primary' : 'secondary'}
          onClick={() => setPeriod(1440)}>
          24H
        </Button>
      </Paper>

      <ComposedChart
        width={900}
        height={450}
        data={data}
        margin={{top: 10, right: 30, left: 0, bottom: 0}}>
        <defs>
          <linearGradient id="colorUv" x1="0" y1="0" x2="0" y2="1">
            <stop offset="5%" stopColor="#8884d8" stopOpacity={0.8} />
            <stop offset="95%" stopColor="#8884d8" stopOpacity={0} />
          </linearGradient>
          <linearGradient id="colorPv" x1="0" y1="0" x2="0" y2="1">
            <stop offset="5%" stopColor="#82ca9d" stopOpacity={0.8} />
            <stop offset="95%" stopColor="#82ca9d" stopOpacity={0} />
          </linearGradient>
        </defs>
        <XAxis dataKey="name" />
        <YAxis domain={['dataMin', 'dataMax']} />
        <CartesianGrid strokeDasharray="3 3" />
        <Tooltip />
        <Area
          type="monotone"
          dataKey="price"
          stroke="#8884d8"
          fillOpacity={1}
          fill="url(#colorUv)"
        />
      </ComposedChart>
    </div>
  );
};

export default MarketGraph;
