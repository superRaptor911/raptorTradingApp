import {Button, Paper} from '@mui/material';
import {format} from 'date-fns';
import React, {useEffect, useState} from 'react';
import {useHistory} from 'react-router-dom';
import Snackbar from '@mui/material/Snackbar';
import {WazirxGetCoinHistory} from '../../api/wazirxApi';
import {useTradingStore} from '../../components/wazirx/tradingMenuMobile/uiStore';
import PlaceOrderMobile from '../../components/wazirx/tradingMenuMobile/PlaceOrderMobile';
import CoinGraph from '../../components/coin/CoinGraph';

interface BuySellButtonsProps {
  coinId: string | null;
  setShowPlaceMenu: (value: boolean) => void;
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

const WazirxTradingMenuMobile = () => {
  const [showPlaceMenu, setShowPlaceMenu] = useState(false);

  const coinId: string | null = useTradingStore(state => state.selectedCoinId);
  const message: string | null = useTradingStore(
    state => state.transactionPlaceMessage,
  );
  const setMessage = useTradingStore(state => state.setTransPlaceMessage);
  const history = useHistory();

  useEffect(() => {
    if (!coinId) {
      history.goBack();
    }
  }, []);

  return (
    <div style={{height: 'calc(100vh - 61px)', fontSize: '14px', marginTop: 5}}>
      <CoinGraph coinId={coinId} />
      <BuySellButtons coinId={coinId} setShowPlaceMenu={setShowPlaceMenu} />
      <PlaceOrderMobile visible={showPlaceMenu} setVisible={setShowPlaceMenu} />

      <Snackbar
        open={Boolean(message)}
        autoHideDuration={2000}
        onClose={() => {
          setMessage(null);
        }}
        message={message}
      />
    </div>
  );
};

export default WazirxTradingMenuMobile;
