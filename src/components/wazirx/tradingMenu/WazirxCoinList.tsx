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
import {getCoinPrice} from '../../helper';

interface WazirxCoinListProp {
  setSelectedCoin: (coin: string) => void;
}

const WazirxCoinList = ({setSelectedCoin}: WazirxCoinListProp) => {
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
                  secondary={getCoinPrice(item.id, coinPrices)}
                />
              </ListItemButton>
            </ListItem>
          ))}
      </List>
    </Paper>
  );
};

export default WazirxCoinList;
