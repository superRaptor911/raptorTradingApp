import {useStore} from '../store';

// method to get coin price using coinID
export const getCoinPrice = coinId => {
  const prices = useStore.getState().coinPrices;
  let coinPrice = prices ? prices[coinId].last : 0;
  coinPrice = parseFloat(coinPrice);
  return coinPrice;
};

export const get24HrChange = coinId => {
  const prices = useStore.getState().coinPrices;
  let coinPrice = prices ? prices[coinId].last : 0;
  coinPrice = parseFloat(coinPrice);

  let oldPrice = prices ? prices[coinId].open : 0;
  oldPrice = parseFloat(oldPrice);

  return ((100 * (coinPrice - oldPrice)) / oldPrice).toFixed(2);
};
