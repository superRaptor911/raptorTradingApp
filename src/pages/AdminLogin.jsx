import {Button, TextField} from '@mui/material';
import React, {useRef} from 'react';
import {useStore} from '../store';

const AdminLogin = () => {
  const passRef = useRef();
  const setPassword = useStore(state => state.setPassword);

  const handleSubmit = () => {
    const password = passRef.current.value;
    setPassword(password);
  };

  return (
    <div
      style={{
        margin: 'auto',
        width: '80%',
        maxWidth: 600,
        display: 'flex',
        flexDirection: 'column',
        justifyContent: 'space-between',
        height: 150,
        marginTop: '10%',
      }}>
      <TextField inputRef={passRef} label="Password" sx={{width: '100%'}} />
      <Button
        color="secondary"
        variant="contained"
        sx={{width: '100%'}}
        onClick={handleSubmit}>
        Submit
      </Button>
    </div>
  );
};

export default AdminLogin;
