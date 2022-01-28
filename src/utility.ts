// Get Human readable value
export function humanReadableValue(value: string | number) {
  value = Number(value);

  if (value == Number.POSITIVE_INFINITY) {
    return value;
  }

  if (value > 1000) {
    value = (value / 1000).toFixed(3) + 'K';
  } else if (value > 0.001 && value < 0) {
    value = (value * 1000).toFixed(3) + 'm';
  } else {
    value = value.toFixed(3);
  }

  return value;
}

// Fix precision error
export function fixedNumber(num: string | number) {
  return Number(Number(num).toFixed(10));
}
