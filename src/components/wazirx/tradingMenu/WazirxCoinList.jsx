/* eslint-disable react/prop-types */
import React, {useEffect} from 'react';
import {useStore} from '../../../store';
import List from '@mui/material/List';
import ListItem from '@mui/material/ListItem';
import ListItemButton from '@mui/material/ListItemButton';
import ListItemIcon from '@mui/material/ListItemIcon';
import ListItemText from '@mui/material/ListItemText';
import Paper from '@mui/material/Paper';
import Avatar from '@mui/material/Avatar';
import useTimer from '../../hooks/useTimer';

const getCoinPrice = (prices, coinId) => {
  let coinPrice = prices ? prices[coinId].last : 0;
  coinPrice = parseFloat(coinPrice);

  if (coinPrice > 1000) {
    coinPrice = (coinPrice / 1000).toFixed(2) + 'K';
  } else if (coinPrice > 0 && coinPrice < 0.001) {
    coinPrice = (coinPrice * 1000).toFixed(2) + 'm';
  } else {
    coinPrice = coinPrice.toFixed(2);
  }
  return coinPrice;
};

const get24hrChange = (prices, coinId) => {
  let coinPrice = prices ? prices[coinId].last : 0;
  coinPrice = parseFloat(coinPrice);

  let oldPrice = prices ? prices[coinId].open : 0;
  oldPrice = parseFloat(oldPrice);

  return ((100 * (coinPrice - oldPrice)) / oldPrice).toFixed(2);
};

const WazirxCoinList = ({setSelectedCoin}) => {
  const coins = useStore(state => state.coins);
  const coinPrices = useStore(state => state.coinPrices);

  const loadCoins = useStore(state => state.loadCoins);
  const loadCoinPrices = useStore(state => state.loadCoinPrices);

  // const isMobile = 'mobile' === useDeviceType();

  useTimer(1500, () => {
    loadCoinPrices();
  });

  useEffect(() => {
    loadCoinPrices();
    loadCoins();
  }, []);

  return (
    <Paper sx={{width: 260, overflowY: 'auto', maxHeight: '80vh'}}>
      <List>
        {coins &&
          coins.map(item => (
            <ListItem disablePadding key={item.id}>
              <ListItemButton onClick={() => setSelectedCoin(item.id)}>
                <ListItemIcon>
                  <Avatar
                    src={item.avatar}
                    alt={item.name}
                    sx={{marginRight: 2}}
                  />
                </ListItemIcon>
                <ListItemText
                  primary={item.name}
                  secondary={getCoinPrice(coinPrices, item.id)}
                />
              </ListItemButton>
            </ListItem>
          ))}
      </List>
    </Paper>
  );
};

export default WazirxCoinList;
