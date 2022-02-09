/* eslint-disable react/prop-types */
import React, {useEffect, useState, useCallback} from 'react';
import {timeFormat} from 'd3-time-format';
import {format} from 'd3-format';
import {ChartCanvas, Chart, ZoomButtons} from 'react-stockcharts';
import {BarSeries, CandlestickSeries} from 'react-stockcharts/lib/series';
import {XAxis, YAxis} from 'react-stockcharts/lib/axes';
import {
  CrossHairCursor,
  MouseCoordinateX,
  MouseCoordinateY,
} from 'react-stockcharts/lib/coordinates';

import {discontinuousTimeScaleProvider} from 'react-stockcharts/lib/scale';
import {OHLCTooltip} from 'react-stockcharts/lib/tooltip';
import {fitWidth} from 'react-stockcharts/lib/helper';
import {last} from 'react-stockcharts/lib/utils';
import {WazirxGetCoinHistory} from '../../api/wazirxApi';
import PeriodSelector from './PeriodSelector';

const convertToObj = d => {
  return {
    date: new Date(d[0] * 1000),
    open: d[1],
    high: d[2],
    low: d[3],
    close: d[4],
    volume: d[5],
  };
};

const CoinGraph = ({coinId, customHeight = 600}) => {
  const [initialData, setInitialData] = useState([]);
  const [width, setWidth] = useState(800);
  const [period, setPeriod] = useState(60);

  const div = useCallback(node => {
    if (node !== null) {
      setWidth(node.getBoundingClientRect().width);
    }
  }, []);

  useEffect(() => {
    WazirxGetCoinHistory(coinId, period, 2000).then(coinData => {
      setInitialData(coinData.map(item => convertToObj(item)));
    });
  }, [coinId, period]);

  if (initialData.length == 0) {
    return null;
  }

  const xScaleProvider = discontinuousTimeScaleProvider.inputDateAccessor(
    d => d.date,
  );
  const {data, xScale, xAccessor, displayXAccessor} =
    xScaleProvider(initialData);

  const end = xAccessor(last(data));
  const start = xAccessor(data[Math.max(0, data.length - 50)]);
  const xExtents = [start, end];

  const margin = {left: 70, right: 70, top: 20, bottom: 30};

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

  const handleReset = () => {};

  const candlesAppearance = {
    wickStroke: '#000000',
    fill: function fill(d) {
      return d.close > d.open ? 'rgb(89,200,147)' : 'rgb(241,83,96)';
    },
    stroke: 'rgba(0,0,0)',
    candleStrokeWidth: 0.5,
    widthRatio: 0.8,
    opacity: 1,
  };

  const changeScroll = () => {
    let style = document.body.style.overflow;
    document.body.style.overflow = style === 'hidden' ? 'auto' : 'hidden';
  };

  return (
    <div ref={div} onMouseEnter={changeScroll} onMouseLeave={changeScroll}>
      <PeriodSelector period={period} setPeriod={setPeriod} />
      <ChartCanvas
        width={width}
        height={height}
        ratio={1}
        margin={margin}
        type={'hybrid'}
        seriesName="MSFT"
        data={data}
        xScale={xScale}
        xAccessor={xAccessor}
        displayXAccessor={displayXAccessor}
        mouseMoveEvent={true}
        panEvent={true}
        zoomEvent={true}
        clamp={false}
        xExtents={xExtents}>
        <Chart id={1} yExtents={[d => [d.high, d.low]]}>
          <XAxis axisAt="bottom" orient="bottom" {...xGrid} />
          <YAxis axisAt="right" orient="right" ticks={5} {...yGrid} />
          <MouseCoordinateY
            at="right"
            orient="right"
            displayFormat={format('.2f')}
          />
          <CandlestickSeries {...candlesAppearance} />
          <OHLCTooltip origin={[-40, 0]} />
          <ZoomButtons onReset={handleReset} />
        </Chart>
        <Chart
          id={2}
          height={100}
          yExtents={d => d.volume}
          origin={(w, h) => [0, h - 100]}>
          <YAxis
            axisAt="left"
            orient="left"
            ticks={5}
            tickFormat={format('.0s')}
          />

          <MouseCoordinateX
            at="bottom"
            orient="bottom"
            displayFormat={timeFormat('%Y-%m-%d')}
          />
          <MouseCoordinateY
            at="left"
            orient="left"
            displayFormat={format('.4s')}
          />
          <BarSeries
            yAccessor={d => d.volume}
            fill={d =>
              d.close > d.open
                ? 'rgba(89,200,147, 0.5)'
                : 'rgba(241,83,96, 0.5)'
            }
          />
        </Chart>
        <CrossHairCursor />
      </ChartCanvas>
    </div>
  );
};

export default CoinGraph;
