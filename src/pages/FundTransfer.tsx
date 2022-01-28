import {Button, Paper, Snackbar, TextField} from '@mui/material';
import React, {useState} from 'react';
import InputLabel from '@mui/material/InputLabel';
import MenuItem from '@mui/material/MenuItem';
import Select from '@mui/material/Select';
import {useStore} from '../store';
import {addFundTransfer} from '../api/api';

const FundTransfer = () => {
  const [showMsg, setShowMsg] = useState<undefined | string | boolean>();
  const [name, setName] = useState('');
  const [transType, setTransType] = useState('DEPOSIT');

  const [amount, setAmount] = useState(0);
  const [donation, setDonation] = useState(0);
  const [fee, setFee] = useState(0);

  const users = useStore(state => state.users);
  const handleSubmit = async () => {
    const result = await addFundTransfer(
      name,
      transType,
      amount,
      fee,
      donation,
      new Date(),
    );

    if (result) {
      setShowMsg(result.message);
      if (result.status) {
        setName('');
        setAmount(0);
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
              <MenuItem value={item.name} key={item.email}>
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
          onChange={e => setAmount(Number(e.target.value))}
          sx={{marginLeft: 'auto'}}
        />
      </div>

      <div style={{display: 'flex'}}>
        <TextField
          label="Donation"
          variant="outlined"
          type="number"
          value={donation}
          onChange={e => setDonation(Number(e.target.value))}
          sx={{width: '45%'}}
        />

        <TextField
          label="Fee"
          variant="outlined"
          type="number"
          value={fee}
          onChange={e => setFee(Number(e.target.value))}
          sx={{width: '45%', marginLeft: 'auto'}}
        />
      </div>

      <div style={{display: 'flex', marginTop: 20}}>
        <Button
          variant="contained"
          onClick={handleSubmit}
          sx={{
            margin: 'auto',
          }}>
          Submit
        </Button>
      </div>

      <Snackbar
        open={Boolean(showMsg)}
        autoHideDuration={2000}
        onClose={() => {
          setShowMsg(false);
        }}
        message={showMsg}
      />
    </Paper>
  );
};

export default FundTransfer;
