import React from 'react';
import {Button, Paper} from '@mui/material';

interface PeriodSelectorProps {
  period: number;
  setPeriod: (period: number) => void;
}

const PeriodSelector = ({period, setPeriod}: PeriodSelectorProps) => {
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
        onClick={() => setPeriod(5)}>
        5min
      </Button>
      <Button
        variant="text"
        color={period == 30 ? 'primary' : 'secondary'}
        onClick={() => setPeriod(15)}>
        15min
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
        onClick={() => setPeriod(240)}>
        4H
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
