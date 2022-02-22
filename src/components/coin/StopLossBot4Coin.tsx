import {Alert, Button, Typography} from '@mui/material';
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
import TradeRuleModal from './TradeRuleModal';

interface StopLossBot4CoinProps {
  coinId: string;
}

const getFilteredRules = (result: any, coinId: string) => {
  if (result && result.status && result.data) {
    const {data} = result;
    return data.reverse().filter((item: StopLoss) => item.coinId == coinId);
  }
  return [];
};

const checkIfLimitReached = (result: any) => {
  if (result && result.status && result.data) {
    const {data} = result;
    return data.length >= 6;
  }
  return true;
};

const StopLossBot4Coin = ({coinId}: StopLossBot4CoinProps) => {
  const [rules, setRules] = useState<StopLoss[]>([]);
  const [loading, setLoading] = useState(true);
  const [limitReached, setLimitReached] = useState(false);
  const [showTradeRuleModal, setShowTradeRuleModal] = useState(false);

  // Load Rules in initial render
  useEffect(() => {
    if (coinId) {
      StopLossBotListRules().then(result => {
        setRules(getFilteredRules(result, coinId));
        setLimitReached(checkIfLimitReached(result));
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
      setRules(getFilteredRules(result, coinId));
      setLimitReached(checkIfLimitReached(result));
    });
  };

  const addNewRule = async (
    customItem: typeof newItem | undefined = undefined,
  ) => {
    const newItem = {
      id: 0,
      isEnabled: true,
      coinId: coinId,
      transType: 'SELL',
      count: 10,
      price: 0,
      condition: 'LESS',
    };

    const item = customItem ? customItem : newItem;

    await StopLossBotAddRule(
      item.isEnabled,
      item.coinId,
      item.price,
      item.count,
      item.transType,
      item.condition,
    );

    StopLossBotListRules().then(result => {
      setRules(getFilteredRules(result, coinId));
      setLimitReached(checkIfLimitReached(result));
    });
  };

  const handleDelete = async (id: string) => {
    await StopLossBotDeleteRule(id);

    StopLossBotListRules().then(result => {
      setRules(getFilteredRules(result, coinId));
      setLimitReached(checkIfLimitReached(result));
    });
  };

  if (loading) {
    return <Loading marginTop={20} />;
  }

  return (
    <div
      style={{width: '100%', margin: 'auto', marginTop: 50, paddingBottom: 20}}>
      <Typography variant="h4" textAlign="center" sx={{marginBottom: 2}}>
        Stop Loss for {coinId}
      </Typography>
      <Visibility hide={!limitReached}>
        <Alert severity={'error'} style={{marginBottom: 10}}>
          You can only add upto 6 rules!
        </Alert>
      </Visibility>
      <div
        style={{
          width: 'max-content',
          margin: 'auto',
          marginBottom: 10,
          display: 'flex',
          flexDirection: 'column',
        }}>
        <Button
          style={{marginBottom: 10}}
          variant="contained"
          onClick={() => addNewRule()}
          disabled={limitReached}>
          Add Rule
        </Button>

        <Button
          variant="contained"
          onClick={() => setShowTradeRuleModal(true)}
          disabled={limitReached}>
          Add Trade Rule
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
      <TradeRuleModal
        visible={showTradeRuleModal}
        setVisible={setShowTradeRuleModal}
        coinId={coinId}
        addRule={addNewRule}
      />
    </div>
  );
};

export default StopLossBot4Coin;
