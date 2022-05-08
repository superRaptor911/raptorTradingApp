import React from 'react';
import {Paper, Typography} from '@mui/material';
import RulesMenu from '../../components/wazirx/stopLossBot/RulesMenu';

const StopLossBot = () => {
  return (
    <div style={{width: '90vw', maxWidth: 1200, margin: 'auto', marginTop: 40}}>
      <Paper
        sx={{
          padding: 2,
          display: 'flex',
          flexDirection: 'column',
          alignItems: 'center',
          borderRadius: 7,
        }}>
        <br />
        <Typography variant="h4">AUTO BOT</Typography>
        <RulesMenu />
      </Paper>
    </div>
  );
};

export default StopLossBot;
