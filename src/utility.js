export function humanReadableValue(value) {
  value = parseFloat(value);

  if (value == Number.POSITIVE_INFINITY) {
    return value;
  }

  if (value > 1000) {
    value = (value / 1000).toFixed(2) + 'K';
  } else if (value > 0 && value < 0.001) {
    value = (value * 1000).toFixed(2) + 'm';
  } else {
    value = value.toFixed(2);
  }

  return value;
}

export function get24HrChange(prices, coinId) {
  let coinPrice = prices ? prices[coinId].last : 0;
  coinPrice = parseFloat(coinPrice);

  let oldPrice = prices ? prices[coinId].open : 0;
  oldPrice = parseFloat(oldPrice);

  return ((100 * (coinPrice - oldPrice)) / oldPrice).toFixed(2);
}
