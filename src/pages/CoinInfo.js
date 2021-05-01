import {useParams} from "react-router";
import Chart from "react-google-charts";
import {useEffect , useState} from "react";
import Avatar from '@material-ui/core/Avatar';
import Typography from '@material-ui/core/Typography';
import useFetch from "../components/useFetch";
import MenuItem from '@material-ui/core/MenuItem';
import Select from '@material-ui/core/Select';
import InputLabel from '@material-ui/core/InputLabel';
import { makeStyles } from '@material-ui/core'
import {serverAddress} from "../components/Utility";
import Table from '@material-ui/core/Table';
import TableBody from '@material-ui/core/TableBody';
import TableCell from '@material-ui/core/TableCell';
import TableContainer from '@material-ui/core/TableContainer';
import TableHead from '@material-ui/core/TableHead';
import TableRow from '@material-ui/core/TableRow';
import Paper from '@material-ui/core/Paper';
import {Link} from "react-router-dom";

const useStyles = makeStyles({
  root: {
    width: '90%',
    maxWidth: 1100,
    marginTop: 110,
    display: 'block',
    marginLeft: 'auto',
    marginRight: 'auto',
    overflowX: 'auto',
    overflowY: 'hidden'
  },
  avatarContainer: {
    textAlign: 'center',
    width: 'min-content',
    margin: 'auto',
    marginBottom: 10
  },

  avatar: {
    margin: 'auto',
    width: 120,
    height: 120
  },

  graph: {
    width: 1000,
    backgroundColor: '#f4f4f4',
    padding: 20,
    borderRadius: 10,
  },
  selectContainer: {
    margin: 40,
    display: 'flex',
    justifyContent: 'center',
    alignItems: 'center',
  },
  select: {
    marginLeft: 10,
  },
  iconContainer: {
    display: 'flex',
    flexDirection: 'row',
    alignItems: 'center',
    flex: 1
  },
  tableContainer: {
    marginBottom: 50,
  },
  icon: {
    width: 40,
    height: 40,
    marginRight: 10,
  },
  iconText: {
    fontSize: 18
  },
});

function genGraphData(data, coinName) {
  let graphData = [];
  graphData.push([
      { type: 'datetime', label: 'Day' },
      coinName,
    ]);

  for (let i of data) {
    let date = new Date(i[0] * 1000);
    graphData.push([date, i[4]]);
  }

  return graphData;
}

function genInvestorTable(data, classes) {
  return (
    <TableContainer component={Paper}>
      <Table  aria-label="simple table">
        <TableHead>
          <TableRow>
            <TableCell>Name</TableCell>
            <TableCell align="center">Coin Count</TableCell>
          </TableRow>
        </TableHead>
        <TableBody>
          {data.map((row) => (
            <TableRow key={row.id}>
              <TableCell component="th" scope="row">
                <Link to={"/user/" + row.username}>
                  <div className={classes.iconContainer}>
                    <Avatar
                      alt={row.username}
                      src={row.avatar}
                      className={classes.icon}
                    />
                    <Typography className={classes.iconText}>
                      {row.username}
                    </Typography>
                  </div>
                </Link>
              </TableCell>

              <TableCell align="center">{row.count}</TableCell>
            </TableRow>
          ))}
        </TableBody>
      </Table>
    </TableContainer>
  );
}

const CoinInfo = () => {
  const classes = useStyles()
  const {coin} = useParams();

  const [target, setTarget] = useState({uri: `${serverAddress}/coin.php`, data: {
    type: 'history',
    coin: coin,
    period: 60,
    limit: 26,
  }});

  const [target2, ] = useState({uri: `${serverAddress}/coin.php`, data: {
    type: 'info',
    coin: coin,
  }});

  // This variable is used to show status when submit button is pressed.
  const [currentStatus, setCurrentStatus] = useState("LOADING ...");
  const [currentStatus2, setCurrentStatus2] = useState("LOADING ...");
  const serverResponse = useFetch(target);
  const serverResponse2 = useFetch(target2);

  const [timePeriod, setTimePeriod] = useState(60);
  const [coinInfo, setCoinInfo] = useState(null);
  const [coinData, setCoinData] = useState();
  const [investorTable, setInvestorTable] = useState();

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
        setCoinData(genGraphData(serverResponse.data.history, coin));
      }
    }
  }, [serverResponse.error, serverResponse.data])

  // Check server response
  useEffect(() => {
    if (serverResponse2.error.error) {
      setCurrentStatus2(serverResponse2.error.msg);
    }
    else if (serverResponse2.data) {
      if (!serverResponse2.data.result) {
        setCurrentStatus2(serverResponse2.data.err);
      }
      else {
        setCurrentStatus2("");
        setCoinInfo(serverResponse2.data.info);
        setInvestorTable(genInvestorTable(serverResponse2.data.investors, classes));
        // setCoinData(genGraphData(serverResponse2.data.history, coin));
      }
    }
  }, [serverResponse2.error, serverResponse2.data])


  // Handle Time period change
  const onTimePeriodChanged = (value) => {
    setCoinData(null);
    setTimePeriod(value);

    setTarget({uri: `${serverAddress}/coin.php`, data: {
      type: 'history',
      coin: coin,
      period: value,
      limit: 26,
    }});
  }

  return (
    <div className={classes.root}>

      <Typography variant="button" color="error">
        {currentStatus2}
      </Typography>
      <div className={classes.avatarContainer}>
        <Avatar
          className={classes.avatar}
          alt={coin}
          src={coinInfo && coinInfo.avatar}
        />
        <Typography>{coinInfo && coinInfo.name}</Typography>
      </div>


      {/* Graph */} 
      <Typography variant="button" color="error">
        {currentStatus}
      </Typography>


      <Typography variant='h4'>
        Coin History
      </Typography>
      <div className={classes.graph}>
        {
          coinData && (
            <Chart
              height={'400px'}
              chartType="LineChart"
              loader={<div>Loading Chart</div>}
              data={coinData}
              options={{
                hAxis: {
                  title: `Time (${timePeriod / 60} Hr)`
                },
                vAxis: {
                  title: 'Value (INR)',
                },
              }}
              rootProps={{ 'data-testid': '1' }}
            />)
        }
      </div>

      <div className={classes.selectContainer}>
        <InputLabel id="type">Time Period</InputLabel>
        <Select
          labelId="type"
          id="transtype"
          value={timePeriod}
          className={classes.select}
          onChange={(e) => onTimePeriodChanged(e.target.value)}
        >
          <MenuItem value={60}>1 HR</MenuItem>
          <MenuItem value={120}>2 HR</MenuItem>
          <MenuItem value={240}>4 HR</MenuItem>
          <MenuItem value={360}>6 HR</MenuItem>
          <MenuItem value={720}>12 HR</MenuItem>
          <MenuItem value={1440}>24 HR</MenuItem>
        </Select>
      </div>

      <div className={classes.tableContainer}>
        <Typography variant='h4'>
          Investors
        </Typography>
        {investorTable}
      </div>
    </div>
  );
}

export default CoinInfo
