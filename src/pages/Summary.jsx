import React from 'react';
import TotalCoins from '../components/summary/TotalCoins';
import TotalInvestmentAndProfit from '../components/summary/TotalInvestmentAndProfit';

const Summary = () => {
  return (
    <div>
      <TotalInvestmentAndProfit />
      <TotalCoins />
    </div>
  );
};

export default Summary;
