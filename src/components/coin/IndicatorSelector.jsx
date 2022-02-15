/* eslint-disable react/prop-types */
import React from 'react';
import FormGroup from '@mui/material/FormGroup';
import FormControlLabel from '@mui/material/FormControlLabel';
import Checkbox from '@mui/material/Checkbox';

const IndicatorSelector = ({indicators, setIndicators}) => {
  const handleChange = (e, key) => {
    const newValues = {...indicators};
    newValues[key] = e.target.checked;
    setIndicators(newValues);
  };
  return (
    <FormGroup
      style={{
        display: 'flex',
        justifyContent: 'space-around',
        flexDirection: 'row',
      }}>
      <FormControlLabel
        control={<Checkbox onChange={e => handleChange(e, 'ema20')} />}
        label="EMA 20"
      />
      <FormControlLabel
        control={<Checkbox onChange={e => handleChange(e, 'sma20')} />}
        label="SMA 20"
      />
      <FormControlLabel
        control={<Checkbox onChange={e => handleChange(e, 'wma20')} />}
        label="WMA 20"
      />
      <FormControlLabel
        control={<Checkbox onChange={e => handleChange(e, 'tma20')} />}
        label="TMA 20"
      />
      <FormControlLabel
        control={<Checkbox onChange={e => handleChange(e, 'ema50')} />}
        label="EMA 50"
      />
    </FormGroup>
  );
};

export default IndicatorSelector;
