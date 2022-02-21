import {MenuItem, Select, Typography} from '@mui/material';
import Checkbox from '@mui/material/Checkbox';
import React, {useEffect, useRef, useState} from 'react';
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
  ReferenceLine,
} from 'recharts';
import {CategoricalChartState} from 'recharts/types/chart/generateCategoricalChart';
import {Transaction} from '../../types';
import Visibility from '../Visibility';
import {getBuyAndSellData, TradeData} from './helper';

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

let [Mx, My] = [0, 0];
let mouseDown = false;
let factor = 0.02;

const handleMouseDown = (e: CategoricalChartState) => {
  mouseDown = true;

  if (mouseDown && e.chartX && e.chartY) {
    [Mx, My] = [e.chartX, e.chartY];
  }
};

const handleMouseMove = (
  e: CategoricalChartState,
  domain: number[],
  setDomain: any,
) => {
  if (!e) {
    mouseDown = false;
  }
  if (mouseDown && e.chartX && e.chartY) {
    const [dx, _dy] = [e.chartX - Mx, e.chartY - My];
    setDomain(domain.map(num => Number((num - dx * factor).toFixed(1))));
    [Mx, My] = [e.chartX, e.chartY];
  }
};

const calculateAvgBuyAndSellPrice = (
  buyTrades: TradeData[],
  sellTrades: TradeData[],
) => {
  let [totBuy, totSell] = [0, 0];
  let [bn, sn] = [0, 0];
  buyTrades.forEach(item => {
    totBuy += item.price * item.amount;
    bn += item.amount;
  });
  sellTrades.forEach(item => {
    totSell += item.price * item.amount;
    sn += item.amount;
  });
  return [totBuy / bn, totSell / sn];
};

const convertDivEventToRechart = (e: React.TouchEvent<HTMLDivElement>) => {
  const state: CategoricalChartState = {
    chartX: e.changedTouches[0].clientX * 3,
    chartY: e.changedTouches[0].clientY * 3,
  };

  return state;
};

const UserTradesGraph = ({userTransactions, coinId}: UserTradesGraphProps) => {
  const [buyData, setBuyData] = useState<TradeData[]>([]);
  const [sellData, setSellData] = useState<TradeData[]>([]);
  const [userCoins, setUserCoins] = useState<string[]>([]);
  const [selectedCoin, setSelectedCoin] = useState('');
  const [avgBuySell, setAvgBuySell] = useState([0, 0]);
  const [normalize, setNormalize] = useState(false);
  const [domain, setDomain] = useState([0, 10]);

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
      setAvgBuySell(calculateAvgBuyAndSellPrice(buyTrades, sellTrades));
    }
  }, [selectedCoin, normalize]);

  return (
    <div
      onTouchStart={e => handleMouseDown(convertDivEventToRechart(e))}
      onTouchEnd={() => {
        mouseDown = false;
      }}
      onTouchMove={e =>
        handleMouseMove(convertDivEventToRechart(e), domain, setDomain)
      }
      style={{
        fontSize: 12,
        marginBottom: 40,
        marginTop: 30,
        userSelect: 'none',
      }}>
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
          onMouseDown={handleMouseDown}
          onMouseMove={e => handleMouseMove(e, domain, setDomain)}
          onMouseUp={() => {
            mouseDown = false;
          }}
          width={730}
          height={250}
          margin={{top: 20, right: 20, bottom: 10, left: 10}}>
          <CartesianGrid strokeDasharray="3 3" />
          <XAxis
            dataKey="id"
            name="ID"
            type="number"
            allowDataOverflow
            domain={domain}
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
          <Scatter
            name="Buy"
            data={buyData}
            fill="green"
            line
            isAnimationActive={false}
          />
          <Scatter
            name="Sell"
            data={sellData}
            fill="red"
            line
            isAnimationActive={false}
          />
          <ReferenceLine
            y={avgBuySell[0]}
            label="Avg. Buy"
            stroke="green"
            strokeDasharray="3 3"
          />
          <ReferenceLine
            y={avgBuySell[1]}
            label="Avg. Sell"
            stroke="red"
            strokeDasharray="3 3"
          />
        </ScatterChart>
      </ResponsiveContainer>
    </div>
  );
};

export default UserTradesGraph;
