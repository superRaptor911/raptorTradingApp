import {Coin, Transaction, Wallet} from '../../types';
import {fixedNumber} from '../../utility';

export interface TradeData {
  amount: number;
  price: number;
  id: number;
}

// Get List of coins from user's wallet
export const getCoinList = (wallet: Wallet) => {
  let coinList = [];
  for (const i in wallet.coins) {
    const count = fixedNumber(wallet.coins[i]);
    if (count > 0) {
      coinList.push({id: i, count: count});
    }
  }
  return coinList;
};

// Get Avatar of coin
export const getCoinAvatar = (coins: Coin[], coinId: string) => {
  let avatar = '';
  coins.forEach(item => {
    if (item.id === coinId) {
      avatar = item.avatar;
    }
  });
  return avatar;
};

const normalizeTransactions = (transactions: Transaction[]) => {
  let max = 0;
  transactions.forEach(item => (max = Math.max(max, item.cost)));
  const newTransactions = transactions.map(item => {
    const newItem = {...item};
    newItem.cost /= max / 100;
    newItem.cost = Number(newItem.cost.toFixed(1));
    return newItem;
  });
  return newTransactions;
};

export const getBuyAndSellData = (
  transactions: Transaction[],
  coinId: string,
  normalize: boolean,
) => {
  const buyTrades: TradeData[] = [];
  const sellTrades: TradeData[] = [];
  let filteredTrans = transactions
    .filter(item => item.coinId == coinId)
    .reverse();

  if (normalize) {
    filteredTrans = normalizeTransactions(filteredTrans);
  }

  let i = 1;
  let j = 1;
  filteredTrans.forEach(item => {
    const tradeData: TradeData = {
      amount: item.coinCount,
      price: item.cost,
      id: item.transType == 'SELL' ? i++ : j++,
    };
    item.transType == 'SELL'
      ? sellTrades.push(tradeData)
      : buyTrades.push(tradeData);
  });

  return {buyTrades: buyTrades, sellTrades: sellTrades, count: i};
};
