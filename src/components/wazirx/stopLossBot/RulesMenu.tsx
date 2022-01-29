import {Button} from '@mui/material';
import React, {useEffect, useState} from 'react';
import {
  StopLossBotAddRule,
  StopLossBotDeleteRule,
  StopLossBotEditRule,
  StopLossBotListRules,
} from '../../../api/wazirxApi';
import {StopLoss} from '../../../types';
import RuleItem from './RuleItem';

const RulesMenu = () => {
  const [rules, setRules] = useState<StopLoss[]>([]);

  useEffect(() => {
    StopLossBotListRules().then(result => {
      if (result && result.status) {
        result.data && setRules(result.data.reverse());
      }
    });
  }, []);

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
        result.data && setRules(result.data.reverse());
      }
    });
  };

  const addRule = async () => {
    const newItem = {
      id: 0,
      isEnabled: true,
      coinId: 'adainr',
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

  return (
    <div style={{width: '100%', maxWidth: 600, margin: 'auto', marginTop: 50}}>
      <div style={{width: 'max-content', margin: 'auto', marginBottom: 10}}>
        <Button variant="contained" onClick={addRule}>
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

export default RulesMenu;
