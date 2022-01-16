import React, {useState} from 'react';
import RuleItem from './RuleItem';

const dummyValues = [
  {
    id: 0,
    enabled: true,
    coinId: 'adainr',
    transType: 'SELL',
    count: 10,
    price: 100,
  },
  {
    id: 2,
    enabled: false,
    coinId: 'batinr',
    transType: 'SELL',
    count: 10,
    price: 100,
  },
];

const RulesMenu = () => {
  const [rules, setRules] = useState(dummyValues);

  const updateRule = newItem => {
    const newRules = rules.map(item => {
      if (item.id == newItem.id) {
        return newItem;
      }
      return item;
    });

    setRules(newRules);
  };

  return (
    <div style={{width: '100%', maxWidth: 600, margin: 'auto', marginTop: 50}}>
      <div>
        {rules.map(item => (
          <RuleItem key={item.id} rule={item} updateRule={updateRule} />
        ))}
      </div>
    </div>
  );
};

export default RulesMenu;
