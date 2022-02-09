/* eslint-disable react/prop-types */
import React from 'react';
import {Button, Paper} from '@mui/material';

const PeriodSelector = ({period, setPeriod}) => {
  return (
    <Paper
      style={{
        display: 'flex',
        margin: 'auto',
        width: 'max-content',
      }}>
      <Button
        variant="text"
        color={period == 30 ? 'primary' : 'secondary'}
        onClick={() => setPeriod(30)}>
        30min
      </Button>
      <Button
        variant="text"
        color={period == 60 ? 'primary' : 'secondary'}
        onClick={() => setPeriod(60)}>
        1H
      </Button>

      <Button
        variant="text"
        color={period == 120 ? 'primary' : 'secondary'}
        onClick={() => setPeriod(120)}>
        2H
      </Button>
      <Button
        variant="text"
        color={period == 240 ? 'primary' : 'secondary'}
        onClick={() => setPeriod(240)}>
        4H
      </Button>

      <Button
        variant="text"
        color={period == 720 ? 'primary' : 'secondary'}
        onClick={() => setPeriod(720)}>
        12H
      </Button>
      <Button
        variant="text"
        color={period == 1440 ? 'primary' : 'secondary'}
        onClick={() => setPeriod(1440)}>
        24H
      </Button>
    </Paper>
  );
};

export default PeriodSelector;
