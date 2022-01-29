import React, {useState} from 'react';
import WazirxAddTransaction from '../WazirxAddTransaction';
import MarketGraph from './MarketGraph';
import Transactions from './Transactions';
import UserWallet from './Wallet';
import WazirxCoinList from './WazirxCoinList';

const TradingMenu = () => {
  const [coinId, setCoinId] = useState('dogeinr');

  return (
    <div style={{display: 'flex', justifyContent: 'space-between', margin: 5}}>
      <WazirxCoinList setSelectedCoin={setCoinId} />
      <div>
        <MarketGraph coinId={coinId} />
        <UserWallet coinId={coinId} />
      </div>
      <div>
        <WazirxAddTransaction coinId={coinId} />
        <Transactions />
      </div>
    </div>
  );
};

export default TradingMenu;
