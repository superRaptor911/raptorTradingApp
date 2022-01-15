import React from 'react';
import {Button, Paper, Typography} from '@mui/material';

const RulesMenu = () => {
  return (
    <div>
      <div>GG</div>
    </div>
  );
};

const StopLossBot = () => {
  return (
    <div
      style={{width: '90vw', maxWidth: 1200, margin: 'auto', marginTop: 100}}>
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
        <Button variant="contained" color="secondary" style={{width: '90%'}}>
          Stop Loss Bot
        </Button>
      </Paper>
    </div>
  );
};

export default StopLossBot;
