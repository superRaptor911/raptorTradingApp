import {Button, TextField} from '@mui/material';
import React, {useRef, useState} from 'react';
import {useHistory} from 'react-router-dom';
import {ROUTES} from '../routes';
import {useStore} from '../store';
import Snackbar from '@mui/material/Snackbar';
import {loginUser} from '../api/api';

const UserLogin = () => {
  const history = useHistory();
  const emailRef = useRef<HTMLInputElement>();
  const passRef = useRef<HTMLInputElement>();
  const [error, setError] = useState<undefined | string | boolean>();

  const setUserCred = useStore(state => state.setUserCred);

  const handleSubmit = async () => {
    if (emailRef.current && passRef.current) {
      const email = emailRef.current.value;
      const password = passRef.current.value;

      try {
        const response = await loginUser(email, password);
        if (response) {
          if (response.status) {
            setUserCred({email: email, password: password});
            history.push(ROUTES.home);
          } else {
            setError(response.message);
          }
        } else {
          throw 'FAILED TO GET RESPONSE';
        }
      } catch (e) {
        /* handle error */
        setError('Something went wrong');
        console.error('UserLogin::error', e);
      }
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
        height: 250,
        marginTop: '10%',
      }}>
      <TextField inputRef={emailRef} label="Email" sx={{width: '100%'}} />
      <TextField
        inputRef={passRef}
        type="password"
        label="Password"
        sx={{width: '100%'}}
      />
      <Button
        color="secondary"
        variant="contained"
        sx={{width: '100%'}}
        onClick={handleSubmit}>
        Submit
      </Button>

      <Snackbar
        open={Boolean(error)}
        autoHideDuration={2000}
        onClose={() => {
          setError(false);
        }}
        message={error}
      />
    </div>
  );
};

export default UserLogin;
