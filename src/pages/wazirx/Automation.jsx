import React from 'react';

import {Button, Paper, Typography} from '@mui/material';
import {useHistory} from 'react-router-dom';
import {ROUTES} from '../../routes';

const Automation = () => {
  const history = useHistory();
  return (
    <div style={{width: '90vw', maxWidth: 800, margin: 'auto', marginTop: 100}}>
      <Paper
        sx={{
          padding: 2,
          display: 'flex',
          flexDirection: 'column',
          alignItems: 'center',
        }}>
        <Typography variant="h4" style={{marginBottom: 30}}>
          Automations
        </Typography>
        <Button
          variant="contained"
          color="secondary"
          style={{width: '90%'}}
          onClick={() => history.push(ROUTES.stopLossBot)}>
          Stop Loss Bot
        </Button>
      </Paper>
    </div>
  );
};

export default Automation;
