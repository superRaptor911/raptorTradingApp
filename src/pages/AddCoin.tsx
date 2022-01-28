import {Button, Paper, TextField} from '@mui/material';
import React, {useState} from 'react';
import {addCoin} from '../api/api';
import Avatar from '@mui/material/Avatar';
import Snackbar from '@mui/material/Snackbar';

const AddCoin = () => {
  const [showMsg, setShowMsg] = useState<Boolean | String | undefined>(false);
  const [name, setName] = useState('');
  const [coinId, setCoinId] = useState('');
  const [avatar, setAvatar] = useState('');

  const onSubmit = async () => {
    const result = await addCoin(name, coinId, avatar);
    if (result) {
      setShowMsg(result.message);
      if (result.status) {
        setName('');
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
      <Avatar
        src={avatar}
        alt={name}
        sx={{margin: 'auto', width: 100, height: 100, marginBottom: 8}}
      />
      <TextField
        label="Name"
        variant="outlined"
        value={name}
        onChange={e => setName(e.target.value)}
        style={{width: '100%', marginBottom: 20}}
      />

      <TextField
        label="Email"
        variant="outlined"
        value={coinId}
        onChange={e => setCoinId(e.target.value)}
        style={{width: '100%', marginBottom: 20}}
      />

      <TextField
        label="Avatar"
        variant="outlined"
        value={avatar}
        onChange={e => setAvatar(e.target.value)}
        style={{width: '100%', marginBottom: 20}}
      />

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

export default AddCoin;
