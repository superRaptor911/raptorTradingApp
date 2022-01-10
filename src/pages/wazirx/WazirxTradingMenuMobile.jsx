/* eslint-disable react/prop-types */
import {Button, Paper} from '@mui/material';
import {format} from 'date-fns';
import React, {useEffect, useState} from 'react';
import {useHistory} from 'react-router-dom';
import {
  ComposedChart,
  XAxis,
  Area,
  YAxis,
  CartesianGrid,
  Tooltip,
  ResponsiveContainer,
} from 'recharts';
import {WazirxGetCoinHistory} from '../../api/wazirxApi';
import PlaceOrder from '../../components/wazirx/tradingMenuMobile/PlaceOrder';
import {useTradingStore} from '../../components/wazirx/tradingMenuMobile/uiStore';

const PeriodSelector = ({period, setPeriod}) => {
  return (
    <Paper style={{display: 'flex', margin: 'auto', width: 'max-content'}}>
      <Button
        variant="text"
        color={period == 1 ? 'primary' : 'secondary'}
        onClick={() => setPeriod(1)}>
        1min
      </Button>
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
  );
};

const BuySellButtons = ({coinId, setShowPlaceMenu}) => {
  const setSide = useTradingStore(state => state.setSide);

  return (
    <div style={{width: '80%', margin: 'auto'}}>
      <Button
        onClick={() => {
          setSide('BUY');
          setShowPlaceMenu(true);
        }}
        variant="contained"
        style={{width: '100%', backgroundColor: 'green', marginTop: 20}}>
        Buy {coinId}
      </Button>

      <Button
        onClick={() => {
          setSide('SELL');
          setShowPlaceMenu(true);
        }}
        variant="contained"
        style={{width: '100%', backgroundColor: 'red', marginTop: 20}}>
        Sell {coinId}
      </Button>
    </div>
  );
};

const WazirxTradingMenuMobile = () => {
  const [data, setData] = useState([]);
  const [period, setPeriod] = useState(60);
  const [showPlaceMenu, setShowPlaceMenu] = useState(false);

  const coinId = useTradingStore(state => state.selectedCoinId);
  const history = useHistory();

  useEffect(() => {
    if (!coinId) {
      history.goBack();
    }
  }, []);

  useEffect(() => {
    if (coinId) {
      WazirxGetCoinHistory(coinId, period).then(result => {
        const newData = result.map(item => {
          const price = parseFloat(item[4]);
          const timeStr = format(new Date(item[0] * 1000), 'hh:mm');
          return {name: timeStr, price: parseFloat(price)};
        });
        setData(newData);
      });
    }
  }, [coinId, period]);

  return (
    <div style={{height: 'calc(100vh - 61px)', fontSize: '14px', marginTop: 5}}>
      <PeriodSelector period={period} setPeriod={setPeriod} />
      <ResponsiveContainer width="100%" height="70%">
        <ComposedChart
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
      </ResponsiveContainer>

      <BuySellButtons coinId={coinId} setShowPlaceMenu={setShowPlaceMenu} />
      <PlaceOrder visible={showPlaceMenu} setVisible={setShowPlaceMenu} />
    </div>
  );
};

export default WazirxTradingMenuMobile;
