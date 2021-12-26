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
