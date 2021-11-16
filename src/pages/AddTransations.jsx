import {Button, Paper, TextField} from '@mui/material';
import React, {useEffect, useState} from 'react';
import InputLabel from '@mui/material/InputLabel';
import MenuItem from '@mui/material/MenuItem';
import Select from '@mui/material/Select';
import {useStore} from '../store';
import {addTransaction} from '../api/api';
import Snackbar from '@mui/material/Snackbar';

const AddTransations = () => {
  const [showMsg, setShowMsg] = useState(false);
  const [name, setName] = useState('');
  const [coin, setCoin] = useState('');
  const [transType, setTransType] = useState('SELL');

  const [count, setCount] = useState(0);
  const [price, setPrice] = useState(0);
  const [fee, setFee] = useState(0);

  const users = useStore(state => state.users);
  const coins = useStore(state => state.coins);

  useEffect(() => {
    setFee(count * price * 0.002);
  }, [count, price]);

  const onSubmit = async () => {
    const result = await addTransaction(
      name,
      transType,
      coin,
      count,
      price,
      fee,
      new Date(),
    );
    if (result) {
      setShowMsg(result.message);
      if (result.status) {
        setName('');
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
      <div style={{display: 'flex', alignItems: 'center'}}>
        <InputLabel id="name-label">Name</InputLabel>
        <Select
          labelId="name-label"
          value={name}
          label="Name"
          onChange={e => setName(e.target.value)}
          sx={{width: '80%', margin: 1, marginLeft: 'auto'}}>
          {users &&
            users.map(item => (
              <MenuItem value={item.name} key={item._id}>
                {item.name}
              </MenuItem>
            ))}
        </Select>
      </div>

      <div style={{display: 'flex', alignItems: 'center'}}>
        <InputLabel id="name-label">Coin</InputLabel>
        <Select
          labelId="name-label"
          value={coin}
          label="Coin"
          onChange={e => setCoin(e.target.value)}
          sx={{width: '80%', margin: 1, marginLeft: 'auto'}}>
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
          sx={{width: '40%', margin: 1, marginLeft: 'auto'}}>
          <MenuItem value={'SELL'}>Sell</MenuItem>
          <MenuItem value={'BUY'}>Buy</MenuItem>
        </Select>

        <TextField
          label="Coin Count"
          variant="outlined"
          type="number"
          value={count}
          onChange={e => setCount(e.target.value)}
          sx={{marginLeft: 'auto'}}
        />
      </div>

      <div style={{display: 'flex'}}>
        <TextField
          label="Coin Price"
          variant="outlined"
          type="number"
          value={price}
          onChange={e => setPrice(e.target.value)}
          sx={{width: '45%'}}
        />

        <TextField
          label="Fee"
          variant="outlined"
          type="number"
          value={fee}
          onChange={e => setFee(e.target.value)}
          sx={{width: '45%', marginLeft: 'auto'}}
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

export default AddTransations;
