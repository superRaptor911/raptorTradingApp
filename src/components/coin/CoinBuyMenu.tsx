import {Button} from '@mui/material';
import React, {useEffect, useState} from 'react';
import PlaceOrderMobile from '../wazirx/tradingMenuMobile/PlaceOrderMobile';
import {useTradingStore} from '../wazirx/tradingMenuMobile/uiStore';

interface BuySellButtonsProps {
  coinId: string | null;
  setShowPlaceMenu: (value: boolean) => void;
}

interface CoinBuyMenuProps {
  coinId: string;
}

const BuySellButtons = ({coinId, setShowPlaceMenu}: BuySellButtonsProps) => {
  const setSide = useTradingStore(state => state.setSide);

  return (
    <div style={{width: '80%', margin: 'auto'}}>
      <Button
        onClick={() => {
          setSide('BUY');
          setShowPlaceMenu(true);
        }}
        variant="contained"
        style={{width: '100%', backgroundColor: 'green', marginTop: 20}}>
        Buy {coinId}
      </Button>

      <Button
        onClick={() => {
          setSide('SELL');
          setShowPlaceMenu(true);
        }}
        variant="contained"
        style={{width: '100%', backgroundColor: 'red', marginTop: 20}}>
        Sell {coinId}
      </Button>
    </div>
  );
};

const CoinBuyMenu = ({coinId}: CoinBuyMenuProps) => {
  const [showPlaceMenu, setShowPlaceMenu] = useState(false);
  const setSelectedCoin = useTradingStore(state => state.setSelectedCoinId);

  useEffect(() => {
    setSelectedCoin(coinId);
  }, [coinId]);

  return (
    <div>
      <BuySellButtons coinId={coinId} setShowPlaceMenu={setShowPlaceMenu} />
      <PlaceOrderMobile visible={showPlaceMenu} setVisible={setShowPlaceMenu} />
    </div>
  );
};

export default CoinBuyMenu;
