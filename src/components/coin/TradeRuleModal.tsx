import {Button, Modal, Paper, Slider, TextField} from '@mui/material';
import React, {useEffect, useState} from 'react';
import {useStore} from '../../store';
import {getWazirxUser} from '../helper';

interface TradeRuleModalProps {
  visible: boolean;
  setVisible: (val: boolean) => void;
  coinId: string;
  addRule: (rule: any) => Promise<void>;
}

const TradeRuleModal = ({
  visible,
  setVisible,
  coinId,
  addRule,
}: TradeRuleModalProps) => {
  const [count, setCount] = useState('0');
  const [price, setPrice] = useState('0');
  const [profitprice, setProfitprice] = useState('0');
  const [lossPrice, setLossPrice] = useState('0');
  const [profitPercentSlider, setProfitPercentSlider] = useState(4);
  const [lossPercentSlider, setLossPercentSlider] = useState(5);
  const [isSubmiting, setIsSubmiting] = useState(false);

  const transactions = useStore(state => state.transactions);

  useEffect(() => {
    if (transactions) {
      const latestTransaction = transactions.find(
        item => item.username == getWazirxUser()?.name && item.coinId == coinId,
      );

      if (latestTransaction) {
        setCount(String(latestTransaction.coinCount));
        setPrice(String(latestTransaction.cost));

        const val = latestTransaction.cost;
        const lossP = (val * (100 - lossPercentSlider)) / 100;
        const profitP = (val * (100 + profitPercentSlider)) / 100;

        setProfitprice(String(profitP));
        setLossPrice(String(lossP));
      }
    }
  }, [transactions]);

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

  const handleSubmitButton = async () => {
    const lossRule = {
      isEnabled: true,
      coinId: coinId,
      transType: 'SELL',
      count: Number(count),
      price: Number(lossPrice),
      condition: 'LESS',
    };

    const profitRule = {
      isEnabled: true,
      coinId: coinId,
      transType: 'SELL',
      count: Number(count),
      price: Number(profitprice),
      condition: 'GREATER',
    };

    setIsSubmiting(true);
    await addRule(profitRule);
    await addRule(lossRule);
    setIsSubmiting(false);
    setVisible(false);
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
          disabled={isSubmiting}
          onClick={handleSubmitButton}>
          Submit
        </Button>
      </Paper>
    </Modal>
  );
};

export default TradeRuleModal;
