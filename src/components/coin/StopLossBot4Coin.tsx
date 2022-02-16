import {Alert, Button} from '@mui/material';
import React, {useEffect, useState} from 'react';
import {
  StopLossBotListRules,
  StopLossBotEditRule,
  StopLossBotAddRule,
  StopLossBotDeleteRule,
} from '../../api/wazirxApi';
import {StopLoss} from '../../types';
import Loading from '../Loading';
import Visibility from '../Visibility';
import RuleItem from '../wazirx/stopLossBot/RuleItem';

interface StopLossBot4CoinProps {
  coinId: string;
}

const getFilteredRules = (rules: StopLoss[], coinId: string) => {
  return rules.reverse().filter((item: StopLoss) => item.coinId == coinId);
};

const StopLossBot4Coin = ({coinId}: StopLossBot4CoinProps) => {
  const [rules, setRules] = useState<StopLoss[]>([]);
  const [loading, setLoading] = useState(true);
  const [limitReached, setLimitReached] = useState(false);

  // Load Rules in initial render
  useEffect(() => {
    if (coinId) {
      StopLossBotListRules().then(result => {
        console.log(result);
        if (result && result.status) {
          const {data} = result;
          if (data) {
            setLimitReached(data.length >= 6);
            // Reverse and filter rules by coinId
            setRules(getFilteredRules(data, coinId));
          }
        }
        setLoading(false);
      });
    }
  }, [coinId]);

  const updateRule = async (newItem: StopLoss) => {
    await StopLossBotEditRule(
      newItem.isEnabled,
      newItem._id,
      newItem.coinId,
      newItem.price,
      newItem.count,
      newItem.transType,
      newItem.condition,
    );

    StopLossBotListRules().then(result => {
      if (result && result.status) {
        result.data && setRules(getFilteredRules(result.data, coinId));
      }
    });
  };

  const addNewRule = async () => {
    const newItem = {
      id: 0,
      isEnabled: true,
      coinId: coinId,
      transType: 'SELL',
      count: 10,
      price: 0,
      condition: 'LESS',
    };

    await StopLossBotAddRule(
      newItem.isEnabled,
      newItem.coinId,
      newItem.price,
      newItem.count,
      newItem.transType,
      newItem.condition,
    );

    StopLossBotListRules().then(result => {
      if (result && result.status) {
        result.data && setRules(result.data.reverse());
      }
    });
  };

  const handleDelete = async (id: string) => {
    await StopLossBotDeleteRule(id);

    StopLossBotListRules().then(result => {
      if (result && result.status) {
        result.data && setRules(result.data.reverse());
      }
    });
  };

  if (loading) {
    return <Loading marginTop={20} />;
  }

  return (
    <div style={{width: '100%', maxWidth: 600, margin: 'auto', marginTop: 50}}>
      <Visibility hide={!limitReached}>
        <Alert severity={'error'} style={{marginBottom: 10}}>
          You can only add upto 6 rules!
        </Alert>
      </Visibility>
      <div style={{width: 'max-content', margin: 'auto', marginBottom: 10}}>
        <Button
          variant="contained"
          onClick={addNewRule}
          disabled={limitReached}>
          Add Rule
        </Button>
      </div>
      <div>
        {rules.map(item => (
          <RuleItem
            key={item._id}
            rule={item}
            updateRule={updateRule}
            handleDelete={handleDelete}
          />
        ))}
      </div>
    </div>
  );
};

export default StopLossBot4Coin;
