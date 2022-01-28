import {Button, TextField} from '@mui/material';
import React, {useRef} from 'react';
import {useHistory} from 'react-router-dom';
import {useStore} from '../store';

const AdminLogin = () => {
  const history = useHistory();
  const passRef = useRef<HTMLInputElement>();
  const setPassword = useStore(state => state.setPassword);

  const handleSubmit = () => {
    if (passRef.current) {
      const password = passRef.current.value;
      setPassword(password);
      history.push('/');
    }
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
