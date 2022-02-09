import React, {useState} from 'react';
import PlaceOrder from './PlaceOrder';
import Transactions from './Transactions';
import UserWallet from './Wallet';
import WazirxCoinList from './WazirxCoinList';
import CoinGraph from '../../coin/CoinGraph';

const TradingMenu = () => {
  const [coinId, setCoinId] = useState('dogeinr');

  return (
    <div style={{display: 'flex', justifyContent: 'space-between', margin: 5}}>
      <WazirxCoinList setSelectedCoin={setCoinId} />
      <div style={{flexGrow: 1, margin: 10}}>
        <CoinGraph coinId={coinId} customHeight={450} />
        <UserWallet coinId={coinId} />
      </div>
      <div>
        <PlaceOrder coinId={coinId} />
        <Transactions />
      </div>
    </div>
  );
};

export default TradingMenu;
