/* eslint-disable react/prop-types */
import React, {useEffect, useState, useCallback, Fragment} from 'react';
import {timeFormat} from 'd3-time-format';
import {format} from 'd3-format';
import {ChartCanvas, Chart, ZoomButtons} from 'react-stockcharts';
import {
  BarSeries,
  CandlestickSeries,
  LineSeries,
} from 'react-stockcharts/lib/series';
import {XAxis, YAxis} from 'react-stockcharts/lib/axes';
import {
  CrossHairCursor,
  CurrentCoordinate,
  MouseCoordinateX,
  MouseCoordinateY,
} from 'react-stockcharts/lib/coordinates';
import {discontinuousTimeScaleProvider} from 'react-stockcharts/lib/scale';
import {OHLCTooltip, MovingAverageTooltip} from 'react-stockcharts/lib/tooltip';
import {last} from 'react-stockcharts/lib/utils';
import {WazirxGetCoinHistory} from '../../api/wazirxApi';
import PeriodSelector from './PeriodSelector';
import {
  calculateGraphDimentions,
  candlesAppearance,
  convertWazirxMarketItemToObj,
  initGraphIndicators,
  toggleScrollBar,
} from './coinGraphHelper';
import Loading from '../Loading';
import IndicatorSelector from './IndicatorSelector';

const CoinGraph = ({coinId, customHeight = 600}) => {
  const [initialData, setInitialData] = useState([]);
  const [calculatedData, setCalculatedData] = useState([]);
  const [width, setWidth] = useState(800);
  const [period, setPeriod] = useState(60);
  const [indicators, setIndicators] = useState({
    ema20: false,
    sma20: false,
    wma20: false,
    tma20: false,
    ema50: false,
  });

  const {ema20, sma20, wma20, tma20, ema50} = initGraphIndicators();

  const div = useCallback(node => {
    if (node !== null) {
      setWidth(node.getBoundingClientRect().width);
    }
  }, []);

  useEffect(() => {
    WazirxGetCoinHistory(coinId, period, 2000).then(coinData => {
      setInitialData(coinData.map(item => convertWazirxMarketItemToObj(item)));
    });
  }, [coinId, period]);

  useEffect(() => {
    const newCalculatedData = ema20(sma20(wma20(tma20(ema50(initialData)))));
    setCalculatedData(newCalculatedData);
  }, [initialData]);

  if (initialData.length == 0 || calculatedData.length == 0) {
    return <Loading marginTop={10} />;
  }

  const xScaleProvider = discontinuousTimeScaleProvider.inputDateAccessor(
    d => d.date,
  );

  const {data, xScale, xAccessor, displayXAccessor} =
    xScaleProvider(calculatedData);

  const end = xAccessor(last(data));
  const start = xAccessor(data[Math.max(0, data.length - 50)]);
  const xExtents = [start, end];

  const {margin, height, yGrid, xGrid} = calculateGraphDimentions(
    customHeight,
    width,
  );

  const handleReset = () => {};
  return (
    <div
      ref={div}
      onMouseEnter={() => toggleScrollBar(false)}
      onMouseLeave={() => toggleScrollBar(true)}>
      <PeriodSelector period={period} setPeriod={setPeriod} />
      <IndicatorSelector
        indicators={indicators}
        setIndicators={setIndicators}
      />
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
          {indicators.ema20 && (
            <Fragment>
              <LineSeries
                yAccessor={ema20.accessor()}
                stroke={ema20.stroke()}
              />

              <CurrentCoordinate
                yAccessor={ema20.accessor()}
                fill={ema20.stroke()}
              />
            </Fragment>
          )}

          {indicators.sma20 && (
            <Fragment>
              <LineSeries
                yAccessor={sma20.accessor()}
                stroke={sma20.stroke()}
              />
              <CurrentCoordinate
                yAccessor={sma20.accessor()}
                fill={sma20.stroke()}
              />
            </Fragment>
          )}

          {indicators.wma20 && (
            <Fragment>
              <LineSeries
                yAccessor={wma20.accessor()}
                stroke={wma20.stroke()}
              />
              <CurrentCoordinate
                yAccessor={wma20.accessor()}
                fill={wma20.stroke()}
              />
            </Fragment>
          )}

          {indicators.tma && (
            <Fragment>
              <LineSeries
                yAccessor={tma20.accessor()}
                stroke={tma20.stroke()}
              />

              <CurrentCoordinate
                yAccessor={tma20.accessor()}
                fill={tma20.stroke()}
              />
            </Fragment>
          )}

          {indicators.ema50 && (
            <Fragment>
              <LineSeries
                yAccessor={ema50.accessor()}
                stroke={ema50.stroke()}
              />

              <CurrentCoordinate
                yAccessor={ema50.accessor()}
                fill={ema50.stroke()}
              />
            </Fragment>
          )}

          <OHLCTooltip origin={[-40, 0]} />

          <MovingAverageTooltip
            onClick={e => console.log(e)}
            origin={[-38, 15]}
            options={[
              {
                yAccessor: sma20.accessor(),
                type: 'SMA',
                stroke: sma20.stroke(),
                windowSize: sma20.options().windowSize,
                echo: 'some echo here',
              },
              {
                yAccessor: wma20.accessor(),
                type: 'WMA',
                stroke: wma20.stroke(),
                windowSize: wma20.options().windowSize,
                echo: 'some echo here',
              },
              {
                yAccessor: tma20.accessor(),
                type: 'TMA',
                stroke: tma20.stroke(),
                windowSize: tma20.options().windowSize,
                echo: 'some echo here',
              },
              {
                yAccessor: ema20.accessor(),
                type: 'EMA',
                stroke: ema20.stroke(),
                windowSize: ema20.options().windowSize,
                echo: 'some echo here',
              },
              {
                yAccessor: ema50.accessor(),
                type: 'EMA',
                stroke: ema50.stroke(),
                windowSize: ema50.options().windowSize,
                echo: 'some echo here',
              },
            ]}
          />
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
