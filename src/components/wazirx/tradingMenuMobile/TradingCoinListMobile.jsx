/* eslint-disable react/prop-types */
import {ButtonBase, Divider} from '@mui/material';
import React from 'react';
import {useHistory} from 'react-router-dom';
import {ROUTES} from '../../../routes';
import {useStore} from '../../../store';
import {get24HrChange} from '../../../utility';
import {useTradingStore} from '../tradingMenuMobile/uiStore';

const CoinItem = ({coin, prices, handlePress}) => {
  const price = prices && prices[coin.id].last;
  const change = get24HrChange(prices, coin.id);

  return (
    <div>
      <ButtonBase
        onClick={() => handlePress(coin.id)}
        style={{
          display: 'flex',
          padding: 10,
          width: '100%',
          justifyContent: 'space-between',
        }}
        key={coin.id}>
        <div style={{fontSize: 28}}>{coin.name}</div>
        <div style={{width: 100}}>
          <div>₹{price}</div>
          <div style={{color: change > 0 ? 'green' : 'red'}}>{change}%</div>
        </div>
      </ButtonBase>
      <Divider />
    </div>
  );
};

const TradingCoinListMobile = () => {
  const coins = useStore(state => state.coins);
  const prices = useStore(state => state.coinPrices);
  const setSelectedCoinId = useTradingStore(state => state.setSelectedCoinId);
  const history = useHistory();

  const handleCoinPress = coinId => {
    console.log('called ', coinId);
    setSelectedCoinId(coinId);
    history.push(ROUTES.tradingMenuMobile);
  };

  return (
    <div>
      <div style={{overflowY: 'auto', height: 'calc(100vh - 112px)'}}>
        {coins &&
          coins.map(item => (
            <CoinItem
              key={item.id}
              coin={item}
              prices={prices}
              handlePress={handleCoinPress}
            />
          ))}
      </div>
    </div>
  );
};

export default TradingCoinListMobile;
