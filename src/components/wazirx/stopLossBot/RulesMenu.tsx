import {Button} from '@mui/material';
import React, {useEffect, useState} from 'react';
import {
  StopLossBotAddRule,
  StopLossBotDeleteRule,
  StopLossBotEditRule,
  StopLossBotListRules,
} from '../../../api/wazirxApi';
import {StopLoss} from '../../../types';
import Loading from '../../Loading';
import RuleItem from './RuleItem';
import Alert from '@mui/material/Alert';
import Visibility from '../../Visibility';

const RulesMenu = () => {
  const [rules, setRules] = useState<StopLoss[]>([]);
  const [loading, setLoading] = useState(true);

  // Load Rules in initial render
  useEffect(() => {
    StopLossBotListRules().then(result => {
      if (result && result.status) {
        result.data && setRules(result.data.reverse());
      }
      setLoading(false);
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

  const addNewRule = async () => {
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

  if (loading) {
    return <Loading marginTop={20} />;
  }

  const limitReached = rules.length >= 5;

  return (
    <div style={{width: '100%', maxWidth: 600, margin: 'auto', marginTop: 50}}>
      <Visibility hide={!limitReached}>
        <Alert severity={'error'} style={{marginBottom: 10}}>
          You can only add upto 5 rules!
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

export default RulesMenu;
