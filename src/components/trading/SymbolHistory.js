import Chart from "react-google-charts";
import {useEffect , useState} from "react";
import Typography from '@material-ui/core/Typography';
import useFetch from "../hooks/useFetch";
import MenuItem from '@material-ui/core/MenuItem';
import Select from '@material-ui/core/Select';
import InputLabel from '@material-ui/core/InputLabel';
import { makeStyles } from '@material-ui/core'
import {serverAddress} from "../Utility";
import Paper from '@material-ui/core/Paper';

const useStyles = makeStyles({
  root: {
    marginTop: 20,
    marginLeft: 20,
  },
  selectContainer: {
    margin: 20,
    display: 'flex',
    justifyContent: 'center',
    alignItems: 'center',
  },
  select: {
    marginLeft: 10,
  },
});

function genGraphData(data, coinName) {
  let graphData = [];
  graphData.push([
      { type: 'datetime', label: 'Day' },
      coinName,
    ]);

  for (let i of data) {
    let date = new Date(i[0]);
    graphData.push([date, parseFloat(i[4]) ]);
  }

  return graphData;
}


const SymbolHistory = ({symbol, width, height}) => {
  const classes = useStyles()

  const [target, setTarget] = useState({uri: `${serverAddress}/trading/market.php`, data: {
    type: 'history',
    symbol: symbol,
    interval: "1h",
    limit: 26,
  }});

  // This variable is used to show status when submit button is pressed.
  const [currentStatus, setCurrentStatus] = useState("LOADING ...");
  const serverResponse = useFetch(target);

  const [timePeriod, setTimePeriod] = useState("1h");
  const [coinData, setCoinData] = useState();

  // Check server response
  useEffect(() => {
    if (serverResponse.error.error) {
      setCurrentStatus(serverResponse.error.msg);
    }
    else if (serverResponse.data) {
      if (!serverResponse.data.result) {
        setCurrentStatus(serverResponse.data.err);
      }
      else {
        setCurrentStatus("");
        if (serverResponse.data.history) {
          setCoinData(genGraphData(serverResponse.data.history, symbol));
        }
      }
    }
  }, [serverResponse.error, serverResponse.data])


  useEffect(() => {
    setTarget({uri: `${serverAddress}/trading/market.php`, data: {
      type: 'history',
      symbol: symbol,
      interval: timePeriod,
      limit: 26,
    }});
  }, [symbol]);

  // Handle Time period change
  const onTimePeriodChanged = (value) => {
    setCoinData(null);
    setTimePeriod(value);

    setTarget({uri: `${serverAddress}/trading/market.php`, data: {
      type: 'history',
      symbol: symbol,
      interval: value,
      limit: 26,
    }});
  }

  const timePeriodMap = {
    "30m": 30,
    "1h": 60,
    "2h": 120,
    "4h": 240,
    "6h": 360,
    "12h": 720,
    "1d": 1440,
    "1w": 10080
  }

  return (
    <div className={classes.root}>
      {/* Graph */} 
      <Typography variant="button" color="error">
        {currentStatus}
      </Typography>

      <Paper>
        {
          coinData && (
            <Chart
              width={width + 'px'}
              height={height + 'px'}
              chartType="LineChart"
              loader={<div>Loading Chart</div>}
              data={coinData}
              options={{
                hAxis: {
                  title: `Time (${timePeriodMap[timePeriod] / 60} Hr)`
                },
                vAxis: {
                  title: 'Value (INR)',
                },
              }}
              rootProps={{ 'data-testid': '1' }}
            />)
        }
      </Paper>

      <div className={classes.selectContainer}>
        <InputLabel id="type">Interval</InputLabel>
        <Select
          labelId="type"
          id="transtype"
          value={timePeriod}
          className={classes.select}
          onChange={(e) => onTimePeriodChanged(e.target.value)}
        >
          <MenuItem value={"30m"}>30 min</MenuItem>
          <MenuItem value={"1h"}>1 HR</MenuItem>
          <MenuItem value={"2h"}>2 HR</MenuItem>
          <MenuItem value={"4h"}>4 HR</MenuItem>
          <MenuItem value={"6h"}>6 HR</MenuItem>
          <MenuItem value={"12h"}>12 HR</MenuItem>
          <MenuItem value={"1d"}>24 HR</MenuItem>
          <MenuItem value={"1w"}>1 Week</MenuItem>
        </Select>
      </div>
    </div>
  );
}

export default SymbolHistory
