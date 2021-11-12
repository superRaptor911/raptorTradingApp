import {Button, Paper, TextField} from '@mui/material';
import React, {useState} from 'react';
import InputLabel from '@mui/material/InputLabel';
import MenuItem from '@mui/material/MenuItem';
import Select from '@mui/material/Select';
import {useStore} from '../store';

const FundTransfer = () => {
  const [name, setName] = useState('');
  const [transType, setTransType] = useState('DEPOSIT');

  const [amount, setAmount] = useState(0);
  const [donation, setDonation] = useState(0);
  const [fee, setFee] = useState(0);

  const users = useStore(state => state.users);

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
        <InputLabel id="name-label">Type</InputLabel>
        <Select
          labelId="name-label"
          value={transType}
          label="Type"
          onChange={e => setTransType(e.target.value)}
          sx={{width: '40%', margin: 1, marginLeft: 'auto'}}>
          <MenuItem value={'DEPOSIT'}>Deposit</MenuItem>
          <MenuItem value={'WITHDRAW'}>Withdraw</MenuItem>
        </Select>

        <TextField
          label="Amount"
          variant="outlined"
          type="number"
          value={amount}
          onChange={e => setAmount(e.target.value)}
          sx={{marginLeft: 'auto'}}
        />
      </div>

      <div style={{display: 'flex'}}>
        <TextField
          label="Donation"
          variant="outlined"
          type="number"
          value={donation}
          onChange={e => setDonation(e.target.value)}
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
          sx={{
            margin: 'auto',
          }}>
          Submit
        </Button>
      </div>
    </Paper>
  );
};

export default FundTransfer;
