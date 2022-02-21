import {StopLoss} from '../../../types';

// Get text form of stop loss contract
export const genTextualContract = (
  coinId: string,
  price: number,
  count: number,
  transType: string,
  condition: string,
) => {
  const str = `${transType} ${count} ${coinId} when price ${condition} than ${price}`;
  return str;
};

// Function to check if rule was changed
export const checkIfRuleChanged = (
  rule: StopLoss,
  isEnabled: boolean,
  coinId: string,
  price: number,
  count: number,
  transType: string,
  condition: string,
) => {
  const isChanged = !(
    rule.isEnabled == isEnabled &&
    rule.coinId == coinId &&
    rule.price == price &&
    rule.count == count &&
    rule.transType == transType &&
    rule.condition == condition
  );

  return isChanged;
};
