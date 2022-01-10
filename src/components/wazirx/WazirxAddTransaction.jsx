/* eslint-disable react/prop-types */
import {Button, Paper, TextField} from '@mui/material';
import React, {useEffect, useState} from 'react';
import RefreshIcon from '@mui/icons-material/Refresh';
import IconButton from '@mui/material/IconButton';
import MenuItem from '@mui/material/MenuItem';
import Select from '@mui/material/Select';
import Snackbar from '@mui/material/Snackbar';
import Alert from '@mui/material/Alert';
import Stack from '@mui/material/Stack';
import {useStore} from '../../store';
import {WazirxPlaceOrder} from '../../api/wazirxApi';

const WazirxAddTransaction = ({coinId}) => {
  const [showMsg, setShowMsg] = useState(false);
  const [priceLoading, setPriceLoading] = useState(false);
  const [transType, setTransType] = useState('SELL');

  const [count, setCount] = useState(0);
  const [price, setPrice] = useState(0);
  const [total, setTotal] = useState(0);

  const coinPrices = useStore(state => state.coinPrices);
  const loadCoinPrices = useStore(state => state.loadCoinPrices);

  useEffect(() => {
    setTotal(count * price);
  }, [count, price]);

  useEffect(() => {
    if (coinId) {
      setPrice(
        transType === 'SELL' ? coinPrices[coinId].buy : coinPrices[coinId].sell,
      );
      setPriceLoading(false);
    }
  }, [coinId, coinPrices, transType]);

  const updatePrices = () => {
    setPriceLoading(true);
    loadCoinPrices();
  };

  const onSubmit = async () => {
    const result = await WazirxPlaceOrder(coinId, transType, count, price);
    if (result) {
      setShowMsg(result.message);
      if (result.status) {
        // setCoin('');
      }
    } else {
      setShowMsg('Error');
    }
  };

  return (
    <Paper
      sx={{
        width: 400,
        height: 'max-content',
        marginBottom: 2,
      }}>
      <Stack sx={{width: '100%'}} spacing={2}>
        {priceLoading && (
          <Alert severity="warning">Loading latest coin price</Alert>
        )}
      </Stack>

      <div style={{display: 'flex', alignItems: 'center'}}>
        <Select
          labelId="name-label"
          value={transType}
          label="Type"
          onChange={e => setTransType(e.target.value)}
          sx={{margin: 1}}>
          <MenuItem value={'SELL'}>Sell</MenuItem>
          <MenuItem value={'BUY'}>Buy</MenuItem>
        </Select>

        <TextField
          label="Coin Count"
          variant="outlined"
          type="number"
          value={count}
          onChange={e => setCount(e.target.value)}
          sx={{margin: 1}}
        />
      </div>

      <div style={{display: 'flex'}}>
        <TextField
          label="Coin Price"
          variant="outlined"
          type="number"
          value={price}
          onChange={e => setPrice(e.target.value)}
          sx={{margin: 1, width: '80%'}}
        />

        <IconButton color="secondary" onClick={updatePrices} style={{}}>
          <RefreshIcon />
        </IconButton>
      </div>

      <TextField
        label="Total"
        variant="outlined"
        type="number"
        value={total}
        onChange={e => {
          setTotal(e.target.value);
          setCount(e.target.value / price);
        }}
        sx={{margin: 1, width: '95%'}}
      />

      <div style={{display: 'flex', marginTop: 20}}>
        <Button
          variant="contained"
          onClick={onSubmit}
          sx={{
            margin: 'auto',
          }}>
          {transType}
        </Button>
      </div>

      <Snackbar
        open={Boolean(showMsg)}
        autoHideDuration={2000}
        onClose={() => {
          setShowMsg(null);
        }}
        message={showMsg}
      />
    </Paper>
  );
};

export default WazirxAddTransaction;
