/* eslint-disable react/prop-types */
import {ButtonBase, Divider} from '@mui/material';
import React from 'react';
import {useStore} from '../../../store';
import {get24HrChange} from '../../../utility';

const CoinItem = ({coin, prices}) => {
  const price = prices && prices[coin.id].last;
  const change = get24HrChange(prices, coin.id);
  return (
    <div>
      <ButtonBase
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

  return (
    <div>
      <div style={{overflowY: 'auto', height: 'calc(100vh - 112px)'}}>
        {coins &&
          coins.map(item => (
            <CoinItem key={item.id} coin={item} prices={prices} />
          ))}
      </div>
    </div>
  );
};

export default TradingCoinListMobile;
