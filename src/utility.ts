// Get Human readable value
export function humanReadableValue(value: string | number) {
  value = Number(value);

  if (value == Number.POSITIVE_INFINITY) {
    return value;
  }
  if (value > 1000000) {
    value = (value / 1000000).toFixed(2) + 'M';
  } else if (value > 1000) {
    value = (value / 1000).toFixed(2) + 'K';
  } else if (value > 0.001 && value < 0.1) {
    value = (value * 1000).toFixed(2) + 'm';
  } else {
    value = value.toFixed(2);
  }

  return value;
}

// Fix precision error
export function fixedNumber(num: string | number) {
  return Number(Number(num).toFixed(10));
}
