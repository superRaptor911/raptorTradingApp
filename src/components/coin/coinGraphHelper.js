import {ema, wma, sma, tma} from 'react-stockcharts/lib/indicator';

// Function to convert Wazirx market item to standard history item
export const convertWazirxMarketItemToObj = d => {
  return {
    date: new Date(d[0] * 1000),
    open: d[1],
    high: d[2],
    low: d[3],
    close: d[4],
    volume: d[5],
  };
};

export const candlesAppearance = {
  wickStroke: '#000000',
  fill: function fill(d) {
    return d.close > d.open ? 'rgb(89,200,147)' : 'rgb(241,83,96)';
  },
  stroke: 'rgba(0,0,0)',
  candleStrokeWidth: 0.5,
  widthRatio: 0.8,
  opacity: 1,
};

export const toggleScrollBar = () => {
  let style = document.body.style.overflow;
  document.body.style.overflow = style === 'hidden' ? 'auto' : 'hidden';
};

export const calculateGraphDimentions = (customHeight, width) => {
  const margin = {left: 50, right: 50, top: 20, bottom: 30};

  const height = customHeight ? customHeight : 600;

  const gridHeight = height - margin.top - margin.bottom;
  const gridWidth = width - margin.left - margin.right;

  const showGrid = true;
  const yGrid = showGrid
    ? {innerTickSize: -1 * gridWidth, tickStrokeOpacity: 0.2}
    : {};
  const xGrid = showGrid
    ? {innerTickSize: -1 * gridHeight, tickStrokeOpacity: 0.2}
    : {};

  return {
    margin: margin,
    height: height,
    yGrid: yGrid,
    xGrid: xGrid,
  };
};

export const initGraphIndicators = () => {
  const ema20 = ema()
    .options({
      windowSize: 20, // optional will default to 10
      sourcePath: 'close', // optional will default to close as the source
    })
    .skipUndefined(true) // defaults to true
    .merge((d, c) => {
      d.ema20 = c;
    }) // Required, if not provided, log a error
    .accessor(d => d.ema20) // Required, if not provided, log an error during calculation
    .stroke('blue'); // Optional

  const sma20 = sma()
    .options({windowSize: 20})
    .merge((d, c) => {
      d.sma20 = c;
    })
    .accessor(d => d.sma20);

  const wma20 = wma()
    .options({windowSize: 20})
    .merge((d, c) => {
      d.wma20 = c;
    })
    .accessor(d => d.wma20);

  const tma20 = tma()
    .options({windowSize: 20})
    .merge((d, c) => {
      d.tma20 = c;
    })
    .accessor(d => d.tma20);

  const ema50 = ema()
    .options({windowSize: 50})
    .merge((d, c) => {
      d.ema50 = c;
    })
    .accessor(d => d.ema50);

  return {
    ema20: ema20,
    sma20: sma20,
    wma20: wma20,
    tma20: tma20,
    ema50: ema50,
  };
};
