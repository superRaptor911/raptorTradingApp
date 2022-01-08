/* eslint-disable react/prop-types */
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
import {WazirxGetCoinHistory} from '../../../api/wazirxApi';

const MarketGraph = ({coinId}) => {
  const [data, setData] = useState([]);
  const [domain, setDomain] = useState({});

  useEffect(() => {
    WazirxGetCoinHistory(coinId).then(result => {
      const newData = [];
      result.forEach(item => {
        const time = new Date(item[0] * 1000);
        const timeStr = `${time.getHours()}:${time.getMinutes()}`;
        newData.push({name: timeStr, price: item[4]});
      });
      setData(newData);
    });
  }, [coinId]);

  return (
    <LineChart
      width={900}
      height={450}
      data={data}
      margin={{top: 5, right: 30, left: 20, bottom: 5}}>
      <CartesianGrid strokeDasharray="3 3" />
      <XAxis dataKey="name" />
      <YAxis domain={['dataMin', 'dataMax']} />
      <Tooltip />
      <Legend />
      <Line type="monotone" dataKey="price" stroke="#82ca9d" />
    </LineChart>
  );
};

export default MarketGraph;
