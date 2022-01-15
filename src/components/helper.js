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
