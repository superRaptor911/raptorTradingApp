import {Button, TextField, Typography} from '@mui/material';
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
        display: 'flex',
        flexDirection: 'column',
        justifyContent: 'space-between',
        marginTop: '10%',
        background: '#FFFFFF',
        backdropFilter: 'blur(4px)',
        borderRadius: '10px',
        width: '80%',
        maxWidth: 600,
        padding: 40,
      }}>
      <div
        style={{
          display: 'flex',
          flexDirection: 'column',
        }}>
        <Typography variant="h4">LOGIN</Typography>
        <br />
        <TextField inputRef={emailRef} label="Email" sx={{width: '100%'}} />
        <br />
        <br />
        <TextField
          inputRef={passRef}
          type="password"
          label="Password"
          sx={{width: '100%'}}
        />
        <br />
        <br />
        <div style={{width: 'max-content', margin: 'auto'}}>
          <Button
            color="secondary"
            variant="contained"
            sx={{
              background: '#008BDA',
              borderRadius: '10px',
              width: 211,
            }}
            onClick={handleSubmit}>
            LOGIN
          </Button>
        </div>

        <Snackbar
          open={Boolean(error)}
          autoHideDuration={2000}
          onClose={() => {
            setError(false);
          }}
          message={error}
        />
      </div>
    </div>
  );
};

export default UserLogin;
