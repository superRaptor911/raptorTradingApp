import React, {useState} from 'react';
import WazirxAddTransaction from '../WazirxAddTransaction';
import MarketGraph from './MarketGraph';
import Transactions from './Transactions';
import WazirxCoinList from './WazirxCoinList';

const TradingMenu = () => {
  const [coin, setCoin] = useState();
  return (
    <div style={{display: 'flex', justifyContent: 'space-between', margin: 5}}>
      <WazirxCoinList setSelectedCoin={setCoin} />
      <MarketGraph />
      <div>
        <WazirxAddTransaction coin={coin} />
        <Transactions />
      </div>
    </div>
  );
};

export default TradingMenu;
