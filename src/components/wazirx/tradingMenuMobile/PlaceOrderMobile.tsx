import React, {useEffect, useState} from 'react';
import Modal from '@mui/material/Modal';
import {Button, Paper} from '@mui/material';
import TextField from '@mui/material/TextField';
import {useTradingStore} from './uiStore';
import {useStore} from '../../../store';
import RefreshIcon from '@mui/icons-material/Refresh';
import IconButton from '@mui/material/IconButton';
import Alert from '@mui/material/Alert';
import Stack from '@mui/material/Stack';
import {WazirxPlaceOrder} from '../../../api/wazirxApi';
import {getWazirxUser} from '../../helper';
import {Wallet} from '../../../types';
import {useHistory} from 'react-router-dom';
import {ROUTES} from '../../../routes';
import Visibility from '../../Visibility';

interface PlaceOrderProps {
  visible: boolean;
  setVisible: (visible: boolean) => void;
}

const PlaceOrderMobile = ({visible, setVisible}: PlaceOrderProps) => {
  const history = useHistory();
  const coinId = useTradingStore(state => state.selectedCoinId);
  const side = useTradingStore(state => state.side);
  const setMessage = useTradingStore(state => state.setTransPlaceMessage);
  const [userWallet, setUserWallet] = useState<Wallet | undefined>();

  const coinPrices = useStore(state => state.coinPrices);
  const loadCoinPrices = useStore(state => state.loadCoinPrices);

  const [priceLoading, setPriceLoading] = useState(false);
  const [count, setCount] = useState<string>('0');
  const [price, setPrice] = useState<number>(0);
  const [total, setTotal] = useState<string>('0');
  const [isLoading, setIsLoading] = useState(false);
  const [lastEditedField, setLastEditedField] = useState<'count' | 'total'>(
    'count',
  );

  useEffect(() => {
    loadCoinPrices();
    const user = getWazirxUser();
    if (user) {
      setUserWallet(user.wallet);
    } else {
      history.push(ROUTES.loginUser);
    }
  }, []);

  useEffect(() => {
    if (coinId) {
      setPrice(
        side === 'SELL' ? coinPrices[coinId].buy : coinPrices[coinId].sell,
      );
      setPriceLoading(false);
    }
  }, [coinId, coinPrices, side]);

  useEffect(() => {
    if (lastEditedField == 'count') {
      setTotal(String(price * Number(count)));
    } else {
      setCount(String(Number(total) / price));
    }
  }, [price]);

  const updatePrices = () => {
    setPriceLoading(true);
    loadCoinPrices();
  };

  const onSubmit = async () => {
    if (coinId) {
      setIsLoading(true);
      const result = await WazirxPlaceOrder(
        coinId,
        side,
        Number(count),
        Number(price),
      );
      setIsLoading(false);
      if (result) {
        setMessage(result.message);
        if (result.status) {
          setVisible(false);
        }
      } else {
        setMessage('Error');
      }
    }
  };

  // Get number of coins in user's wallet
  const getCoinCount = () => {
    let count = 0;
    if (coinId) {
      const coinCount = userWallet?.coins?.[coinId];
      if (coinCount) {
        count = coinCount;
      }
    }
    return count;
  };

  if (!coinId || !userWallet) {
    return null;
  }

  const handleCoinCountInput = (e: any) => {
    const val = Number(e.target.value);
    setCount(e.target.value);
    setTotal(String(val * price));
    setLastEditedField('count');
  };

  const handleTotalInput = (e: any) => {
    const val = Number(e.target.value);
    setTotal(e.target.value);
    setCount(String(val / price));
    setLastEditedField('total');
  };

  return (
    <Modal open={visible} onClose={() => setVisible(false)}>
      <Paper
        style={{
          width: '80%',
          height: 'max-content',
          margin: 'auto',
          padding: 8,
          marginTop: '25%',
        }}>
        <Stack sx={{width: '100%'}} spacing={2}>
          {priceLoading && (
            <Alert severity="warning">Loading latest coin price</Alert>
          )}
        </Stack>
        <TextField
          label="Coin Count"
          variant="outlined"
          style={{width: '100%', marginTop: 10}}
          value={count}
          onChange={handleCoinCountInput}
        />
        <Visibility hide={getCoinCount() <= 0}>
          <div
            style={{
              display: 'flex',
              fontSize: 14,
              padding: 4,
            }}>
            {coinId + ' ' + getCoinCount()}
          </div>
        </Visibility>

        <div style={{display: 'flex'}}>
          <TextField
            disabled
            label="Price"
            variant="outlined"
            style={{width: '100%', marginTop: 12}}
            value={price}
            onChange={e => setPrice(Number(e.target.value))}
          />

          <IconButton color="secondary" onClick={updatePrices} style={{}}>
            <RefreshIcon />
          </IconButton>
        </div>

        <TextField
          label="Total"
          variant="outlined"
          style={{width: '100%', marginTop: 14}}
          value={total}
          onChange={handleTotalInput}
        />
        <div
          style={{
            display: 'flex',
            fontSize: 14,
            padding: 4,
          }}>
          ₹{userWallet?.balance.toFixed(2)}
        </div>

        <Button
          style={{width: '100%', marginTop: 12}}
          variant="contained"
          disabled={isLoading}
          onClick={onSubmit}>
          {side} {coinId}
        </Button>
      </Paper>
    </Modal>
  );
};

export default PlaceOrderMobile;
