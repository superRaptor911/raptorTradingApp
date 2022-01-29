import {useStore} from '../store';
import {Coin, User, Wallet} from '../types';

// method to get coin price using coinID
export const getCoinPrice = (coinId: string, coinPrices?: any) => {
  const prices = coinPrices || useStore.getState().coinPrices;
  let coinPrice = prices && prices[coinId]?.last;
  coinPrice = coinPrice ? Number(coinPrice) : 0;
  return coinPrice;
};

export const get24HrChange = (coinId: string) => {
  const prices = useStore.getState().coinPrices;

  let coinPrice = prices && prices[coinId]?.last;
  coinPrice = coinPrice ? Number(coinPrice) : 0;

  let oldPrice = prices && prices[coinId]?.open;
  oldPrice = oldPrice ? Number(oldPrice) : 0;

  return Number(((100 * (coinPrice - oldPrice)) / oldPrice).toFixed(2));
};

export const getUsernameFromEmail = (email: string) => {
  const users = useStore.getState().users;
  const user = users?.find(user => user.email === email);
  return user?.name;
};

export const getWazirxUser = () => {
  const cred = useStore.getState().userCred;
  if (cred) {
    const users = useStore.getState().users;
    const wazirxUser = users?.find(user => user.email === user.email);
    return wazirxUser;
  }
  return null;
};

// Get coin from coins array using coin name
export const getCoin = (coins: Coin[], coinName: string) => {
  for (const i of coins) {
    if (i.name == coinName) {
      return i;
    }
  }
  return null;
};

// Get user from users array using user name
export const getUser = (username: string, users: User[]) => {
  for (const user of users) {
    if (user.name === username) {
      return user;
    }
  }
  return null;
};

// Calculate current portfolio of user
export const calculatePortfolio = (wallet: Wallet, prices: any) => {
  let total = 0;
  // Calculate coin worth
  if (prices && wallet.coins) {
    for (const i in wallet.coins) {
      if (prices[i]) {
        const count = wallet.coins[i];
        const value: number = prices[i].last;
        total += count * value;
      }
    }
  }

  return total + wallet.balance;
};
