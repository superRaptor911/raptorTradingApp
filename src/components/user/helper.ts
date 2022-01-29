import {Coin, Wallet} from '../../types';
import {fixedNumber} from '../../utility';

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
