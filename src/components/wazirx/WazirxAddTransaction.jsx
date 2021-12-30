import {Button, Paper, TextField} from '@mui/material';
import React, {useEffect, useState} from 'react';
import InputLabel from '@mui/material/InputLabel';
import MenuItem from '@mui/material/MenuItem';
import Select from '@mui/material/Select';
import Snackbar from '@mui/material/Snackbar';
import Alert from '@mui/material/Alert';
import Stack from '@mui/material/Stack';
import {useStore} from '../../store';
import {WazirxPlaceOrder} from '../../api/wazirxApi';

const getCoinId = (coins, coinName) => {
  for (const i of coins) {
    if (i.name === coinName) {
      return i.id;
    }
  }
  return null;
};

const WazirxAddTransaction = () => {
  const [showMsg, setShowMsg] = useState(false);
  const [priceLoading, setPriceLoading] = useState(false);
  const [coin, setCoin] = useState('');
  const [transType, setTransType] = useState('SELL');

  const [count, setCount] = useState(0);
  const [price, setPrice] = useState(0);
  const [total, setTotal] = useState(0);

  const coins = useStore(state => state.coins);
  const coinPrices = useStore(state => state.coinPrices);
  const loadCoinPrices = useStore(state => state.loadCoinPrices);

  useEffect(() => {
    setTotal(count * price);
  }, [count, price]);

  useEffect(() => {
    if (coin != '') {
      const coinId = getCoinId(coins, coin);
      setPrice(
        transType === 'SELL' ? coinPrices[coinId].buy : coinPrices[coinId].sell,
      );
      setPriceLoading(false);
    }
  }, [coin, coinPrices]);

  const updatePrices = () => {
    setPriceLoading(true);
    loadCoinPrices();
  };

  const onSubmit = async () => {
    const result = await WazirxPlaceOrder(coin, transType, count, price);
    if (result) {
      setShowMsg(result.message);
      if (result.status) {
        setCoin('');
      }
    } else {
      setShowMsg('Error');
    }
  };

  return (
    <Paper
      sx={{
        width: 800,
        padding: 2,
        margin: 'auto',
        marginTop: 10,
      }}>
      <Stack sx={{width: '100%'}} spacing={2}>
        {priceLoading && (
          <Alert severity="warning">Loading latest coin price</Alert>
        )}
      </Stack>

      <div style={{display: 'flex', alignItems: 'center'}}>
        <InputLabel id="name-label">Coin</InputLabel>
        <Select
          labelId="name-label"
          value={coin}
          label="Coin"
          onChange={e => setCoin(e.target.value)}
          sx={{width: '80%', margin: 1, marginLeft: 'auto', marginRight: 6}}>
          {coins &&
            coins.map(item => (
              <MenuItem value={item.name} key={item._id}>
                {item.name}
              </MenuItem>
            ))}
        </Select>
      </div>

      <div style={{display: 'flex', alignItems: 'center'}}>
        <InputLabel id="name-label">Type</InputLabel>
        <Select
          labelId="name-label"
          value={transType}
          label="Type"
          onChange={e => setTransType(e.target.value)}
          sx={{width: '80%', margin: 1, marginLeft: 'auto', marginRight: 6}}>
          <MenuItem value={'SELL'}>Sell</MenuItem>
          <MenuItem value={'BUY'}>Buy</MenuItem>
        </Select>
      </div>

      <div
        style={{
          display: 'flex',
          flexDirection: 'column',
          width: '80%',
          margin: 'auto',
        }}>
        <TextField
          label="Coin Count"
          variant="outlined"
          type="number"
          value={count}
          onChange={e => setCount(e.target.value)}
          sx={{margin: 1}}
        />

        <div style={{display: 'flex'}}>
          <TextField
            label="Coin Price"
            variant="outlined"
            type="number"
            value={price}
            onChange={e => setPrice(e.target.value)}
            sx={{margin: 1}}
          />

          <Button
            color="secondary"
            onClick={updatePrices}
            style={{marginLeft: 'auto'}}>
            Latest
          </Button>
        </div>

        <TextField
          label="Total"
          variant="outlined"
          type="number"
          value={total}
          onChange={e => setTotal(e.target.value)}
          sx={{margin: 1}}
        />
      </div>
      <div style={{display: 'flex', marginTop: 20}}>
        <Button
          variant="contained"
          onClick={onSubmit}
          sx={{
            margin: 'auto',
          }}>
          Submit
        </Button>
      </div>

      <Snackbar
        open={showMsg}
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
