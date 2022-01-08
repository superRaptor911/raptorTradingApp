import React, {useState} from 'react';
import WazirxAddTransaction from '../WazirxAddTransaction';
import MarketGraph from './MarketGraph';
import Transactions from './Transactions';
import WazirxCoinList from './WazirxCoinList';

const TradingMenu = () => {
  const [coinId, setCoinId] = useState();

  return (
    <div style={{display: 'flex', justifyContent: 'space-between', margin: 5}}>
      <WazirxCoinList setSelectedCoin={setCoinId} />
      <MarketGraph coinId={coinId} />
      <div>
        <WazirxAddTransaction coinId={coinId} />
        <Transactions />
      </div>
    </div>
  );
};

export default TradingMenu;
