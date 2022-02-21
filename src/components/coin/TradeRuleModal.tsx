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
  const [profitPercentSlider, setProfitPercentSlider] = useState(4);
  const [lossPercentSlider, setLossPercentSlider] = useState(5);

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

  const handlePriceInput = (e: any) => {
    const val = Number(e.target.value);
    const lossP = (val * (100 - lossPercentSlider)) / 100;
    const profitP = (val * (100 + profitPercentSlider)) / 100;

    setPrice(e.target.value);
    setProfitprice(String(profitP));
    setLossPrice(String(lossP));
  };

  return (
    <Modal open={visible} onClose={() => setVisible(false)}>
      <Paper
        style={{
          width: '80%',
          maxWidth: 800,
          height: 'max-content',
          margin: 'auto',
          padding: 8,
          marginTop: '10%',
        }}>
        <TextField
          type="number"
          label="Coin Count"
          variant="outlined"
          style={{width: '100%', marginTop: 10}}
          value={count}
          onChange={e => setCount(e.target.value)}
        />

        <TextField
          type="number"
          label="Price"
          variant="outlined"
          style={{width: '100%', marginTop: 12}}
          value={price}
          onChange={handlePriceInput}
        />

        <TextField
          type="number"
          label="Profit Sell Price"
          variant="outlined"
          style={{width: '100%', marginTop: 12}}
          value={profitprice}
          onChange={handleProfitInput}
        />

        <TextField
          type="number"
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
