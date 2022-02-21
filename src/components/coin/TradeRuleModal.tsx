import {Button, Modal, Paper, Slider, TextField} from '@mui/material';
import React, {useState} from 'react';

interface TradeRuleModalProps {
  visible: boolean;
  setVisible: (val: boolean) => void;
}

const TradeRuleModal = ({visible, setVisible}: TradeRuleModalProps) => {
  const [count, setCount] = useState('0');
  const [price, setPrice] = useState('0');
  const [profitprice, setProfitprice] = useState('0');
  const [lossPrice, setLossPrice] = useState('0');
  const [profitPercentSlider, setProfitPercentSlider] = useState(0);
  const [lossPercentSlider, setLossPercentSlider] = useState(0);

  const handleProfitSliderChange = (_event: any, newValue: any) => {
    setProfitPercentSlider(newValue);
    setProfitprice(String((Number(price) * (newValue + 100)) / 100));
  };

  const handleLossSliderChange = (_event: any, newValue: any) => {
    setLossPercentSlider(newValue);
    setLossPrice(String((Number(price) * (100 - newValue)) / 100));
  };

  const handleProfitInput = (e: any) => {
    const val = Number(e.target.value);
    setProfitprice(e.target.value);
    const percent = (100 * val) / Number(price) - 100;
    setProfitPercentSlider(Number(percent.toFixed(1)));
  };

  const handleLossInput = (e: any) => {
    const val = Number(e.target.value);
    setLossPrice(e.target.value);
    const percent = 100 - (100 * val) / Number(price);
    setLossPercentSlider(Number(percent.toFixed(1)));
  };

  return (
    <Modal open={visible} onClose={() => setVisible(false)}>
      <Paper
        style={{
          width: '80%',
          height: 'max-content',
          margin: 'auto',
          padding: 8,
          marginTop: '25%',
        }}>
        <TextField
          label="Coin Count"
          variant="outlined"
          style={{width: '100%', marginTop: 10}}
          value={count}
          onChange={e => setCount(e.target.value)}
        />

        <TextField
          disabled
          label="Price"
          variant="outlined"
          style={{width: '100%', marginTop: 12}}
          value={price}
          onChange={e => setPrice(e.target.value)}
        />

        <TextField
          disabled
          label="Profit Sell Price"
          variant="outlined"
          style={{width: '100%', marginTop: 12}}
          value={profitprice}
          onChange={handleProfitInput}
        />

        <TextField
          disabled
          label="Loss Sell Price"
          variant="outlined"
          style={{width: '100%', marginTop: 12}}
          value={lossPrice}
          onChange={handleLossInput}
        />

        <Slider
          value={profitPercentSlider}
          color="primary"
          valueLabelDisplay="auto"
          onChange={handleProfitSliderChange}
        />
        <Slider
          value={lossPercentSlider}
          color="secondary"
          valueLabelDisplay="auto"
          onChange={handleLossSliderChange}
        />

        <Button
          style={{width: '100%', marginTop: 12}}
          variant="contained"
          // disabled={isLoading}
          // onClick={onSubmit}>
        >
          Submit
        </Button>
      </Paper>
    </Modal>
  );
};

export default TradeRuleModal;
