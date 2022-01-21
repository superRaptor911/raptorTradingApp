import {useStore} from '../store';

// method to get coin price using coinID
export const getCoinPrice = coinId => {
  const prices = useStore.getState().coinPrices;
  let coinPrice = prices && prices[coinId]?.last;
  coinPrice = coinPrice ? parseFloat(coinPrice) : 0;
  return coinPrice;
};

export const get24HrChange = coinId => {
  const prices = useStore.getState().coinPrices;

  let coinPrice = prices && prices[coinId]?.last;
  coinPrice = coinPrice ? parseFloat(coinPrice) : 0;

  let oldPrice = prices && prices[coinId]?.open;
  oldPrice = oldPrice ? parseFloat(oldPrice) : 0;

  return ((100 * (coinPrice - oldPrice)) / oldPrice).toFixed(2);
};

export const getUsernameFromEmail = email => {
  const users = useStore.getState().users;
  const user = users?.find(user => user.email === email);
  return user?.email;
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
