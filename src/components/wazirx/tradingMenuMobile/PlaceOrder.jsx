/* eslint-disable react/prop-types */
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
import useTimer from '../../hooks/useTimer';
import {WazirxPlaceOrder} from '../../../api/wazirxApi';
import {getWazirxUser} from '../../helper';
// import {useHistory} from 'react-router-dom';
// import {ROUTES} from '../../../routes';

const PlaceOrder = ({visible, setVisible}) => {
  // const history = useHistory();
  const coinId = useTradingStore(state => state.selectedCoinId);
  const side = useTradingStore(state => state.side);
  const setMessage = useTradingStore(state => state.setTransPlaceMessage);
  const [user, setUser] = useState();

  const coinPrices = useStore(state => state.coinPrices);
  const loadCoinPrices = useStore(state => state.loadCoinPrices);

  const [priceLoading, setPriceLoading] = useState(false);
  const [count, setCount] = useState(0);
  const [price, setPrice] = useState(0);
  const [total, setTotal] = useState(0);

  useEffect(() => {
    loadCoinPrices();
    setUser(getWazirxUser());
  }, []);

  useEffect(() => {
    setTotal(count * price);
  }, [count, price]);

  useEffect(() => {
    if (coinId) {
      setPrice(
        side === 'SELL' ? coinPrices[coinId].buy : coinPrices[coinId].sell,
      );
      setPriceLoading(false);
    }
  }, [coinId, coinPrices, side]);

  const updatePrices = () => {
    setPriceLoading(true);
    loadCoinPrices();
  };

  const onSubmit = async () => {
    const result = await WazirxPlaceOrder(coinId, side, count, price);
    if (result) {
      setMessage(result.message);
      if (result.status) {
        // history.push(ROUTES.tradingMenu);
        setVisible(false);
      }
    } else {
      setMessage('Error');
    }
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
          onChange={e => setCount(e.target.value)}
        />

        <div style={{display: 'flex'}}>
          <TextField
            disabled
            label="Price"
            variant="outlined"
            style={{width: '100%', marginTop: 12}}
            value={price}
            onChange={e => setPrice(e.target.value)}
          />

          <IconButton color="secondary" onClick={updatePrices} style={{}}>
            <RefreshIcon />
          </IconButton>
        </div>

        <TextField
          label="Total"
          variant="outlined"
          style={{width: '100%', marginTop: 12, marginBottom: 15}}
          value={total}
          onChange={e => {
            setTotal(e.target.value);
            setCount(e.target.value / price);
          }}
        />

        <Button style={{width: '100%'}} variant="contained" onClick={onSubmit}>
          {side} {coinId}
        </Button>
      </Paper>
    </Modal>
  );
};

export default PlaceOrder;
