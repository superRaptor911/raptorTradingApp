import React, {useState} from 'react';
import WazirxAddTransaction from '../WazirxAddTransaction';
import WazirxCoinList from './WazirxCoinList';

const TradingMenu = () => {
  const [coin, setCoin] = useState();
  return (
    <div style={{display: 'flex'}}>
      <WazirxCoinList setSelectedCoin={setCoin} />
      <WazirxAddTransaction coin={coin} />
    </div>
  );
};

export default TradingMenu;
