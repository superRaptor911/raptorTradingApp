import {useEffect , useRef, useState} from "react";
import useFetch from "../components/useFetch";
import {readableValue, serverAddress} from '../components/Utility';
import Avatar from '@material-ui/core/Avatar';
import Table from '@material-ui/core/Table';
import Typography from '@material-ui/core/Typography';
import TableBody from '@material-ui/core/TableBody';
import TableCell from '@material-ui/core/TableCell';
import TableContainer from '@material-ui/core/TableContainer';
import TableHead from '@material-ui/core/TableHead';
import TableRow from '@material-ui/core/TableRow';
import Paper from '@material-ui/core/Paper';
import { makeStyles } from '@material-ui/core/styles';
import {Link} from "react-router-dom";

const useStyles = makeStyles((theme) => ({
  iconContainer: {
    display: 'flex',
    flexDirection: 'row',
    alignItems: 'center',
    flex: 1
  },
  icon: {
    width: 40,
    height: 40,
    marginRight: 10,
  },
  iconText: {
    fontSize: 18
  },
  red: {
    color: 'red'
  },
  green: {
    color: 'green'
  }
}));



const generateCoinTable = (data, pricing, classes) => {
  return (
    <TableContainer component={Paper}>
      <Table  aria-label="simple table">
        <TableHead>
          <TableRow>
            <TableCell>Coin</TableCell>
            <TableCell align="center">Coin ID</TableCell>
            <TableCell align="center">Current Price (INR)</TableCell>
          </TableRow>
        </TableHead>
        <TableBody>
          {data.map((row) => (
            <TableRow key={row.name}>
              <TableCell component="th" scope="row">
                <Link to={"/coininfo/" + row.id}>
                <div className={classes.iconContainer}>
                  <Avatar
                    alt={row.name}
                    src={row.avatar}
                    className={classes.icon}
                  />
                  <Typography className={classes.iconText}>
                    {row.name}
                  </Typography>
                </div>
                  </Link>
              </TableCell>

              <TableCell align="center">{row.id}</TableCell>
              <TableCell align="center">{pricing && pricing[row.id] && readableValue(pricing[row.id].last)}</TableCell>
            </TableRow>
          ))}
        </TableBody>
      </Table>
    </TableContainer>
  );
}

function getUserInfo(transctionList, pricing) {
  if (!transctionList) {
    return [];
  }
  let dict = {};
  for (let t of transctionList) {
    dict[t.username] = {
      name: t.username,
      avatar: t.userAvatar,
      investment: t.investment,
      amount: t.amount,
      value: parseFloat(t.amount),
      profit: 0,
      percent: 0
    };

    dict[t.username].investment = Math.max(dict[t.username].investment, 0);
    if (pricing) {
      for (let i of t.coins) {
        let coin = pricing[i.coin];
        if (coin) {
          dict[t.username].value += coin.last * i.count;
        }
      }

      dict[t.username].profit = dict[t.username].value - dict[t.username].investment ;
      dict[t.username].percent = (dict[t.username].value / dict[t.username].investment ) * 100 - 100;
    }
  }

  let arr = [];

  for (let key in dict) {
    arr.push(dict[key]);
  }
  return arr;
}

const generateUserTable = (data, classes) => {
  return (
    <TableContainer component={Paper}>
      <Table  aria-label="simple table">
        <TableHead>
          <TableRow>
            <TableCell>Name</TableCell>
            <TableCell align="center">Investment (INR)</TableCell>
            <TableCell align="center">Current Value (INR)</TableCell>
            <TableCell align="center">Profit (INR)</TableCell>
            <TableCell align="center">Percentage(%)</TableCell>
          </TableRow>
        </TableHead>
        <TableBody>
          {data.map((row) => (
            <TableRow key={row.name}>
              <TableCell component="th" scope="row">
                <Link to={"/user/" + row.name}>
                  <div className={classes.iconContainer}>
                    <Avatar
                      alt={row.name}
                      src={row.avatar}
                      className={classes.icon}
                    />
                    <Typography className={classes.iconText}>
                      {row.name}
                    </Typography>
                  </div>
                </Link>
              </TableCell>

              <TableCell align="center">{parseFloat(row.investment).toFixed(2)}</TableCell>
              <TableCell align="center">{(parseFloat(row.value)).toFixed(2)}</TableCell>
              <TableCell align="center" className={(row.profit > 0) ? classes.green : classes.red}>{row.profit.toFixed(2)}</TableCell>
              <TableCell align="center" className={(row.percent > 0) ? classes.green : classes.red}>{row.percent.toFixed(2) + "%"}</TableCell>
            </TableRow>
          ))}
        </TableBody>
      </Table>
    </TableContainer>
  );
}


const CoinTable = () => {
  const classes = useStyles();
  const [target, ] = useState({uri:  `${serverAddress}/coin.php`, data: {type: "list"}});
  const [target2, setTarget2 ] = useState({uri:  `${serverAddress}/coin.php`, data: {type: "prices" , firstFetch: true}});
  const [target3, ] = useState({uri:  `${serverAddress}/transction.php`, data: {type: "investmentNcoins"}});
  const [coinList, setCoinList] = useState();
  const [userList, setUserList] = useState();
  const [timeoutCounter, setTimeoutCounter] = useState(0);

  const serverResponse = useFetch(target);
  const serverResponse2 = useFetch(target2);
  const serverResponse3 = useFetch(target3);

  const coinData = useRef([]);
  const transactionData = useRef([]);
  const pricingData = useRef([]);

  useEffect(() => {
    const timer = setTimeout(() => {
      console.log('Refreshing data');
      setTarget2({uri:  `${serverAddress}/coin.php`, data: {type: "prices"}})
      setTimeoutCounter(timeoutCounter + 1);
    }, 2000);
    return () => clearTimeout(timer);
  }, [timeoutCounter]);

  // Get coins
  useEffect(() => {
    if (serverResponse.error.error) {
      // Fetch request failed
      console.log("Error::CoinTable::" + serverResponse.error.msg);
    }
    else if (serverResponse.data) {
      if (serverResponse.data.result) {
        setCoinList(generateCoinTable(serverResponse.data.coins, pricingData.current, classes));
        coinData.current = serverResponse.data.coins;
      }
      else {
        // Error from server
        console.log("Error::CoinTable::" + serverResponse.data.err);
      }
    }
  }, [serverResponse.error, serverResponse.data]);


  // Update profit/Loss
  useEffect(() => {
    if (serverResponse2.error.error) {
      // Fetch request failed
      console.log("Error::CoinTable::" + serverResponse2.error.msg);
    }
    else if (serverResponse2.data) {
      if (serverResponse2.data.result) {
        setCoinList(generateCoinTable(coinData.current, serverResponse2.data.coins , classes));
        setUserList(generateUserTable(getUserInfo(transactionData.current, serverResponse2.data.coins), classes));
        pricingData.current = serverResponse2.data.coins;
        console.log("Data type : " + serverResponse2.data.type);
      }
      else {
        // Error from server
        console.log("Error::CoinTable::" + serverResponse2.data.err);
      }
    }
  }, [serverResponse2.error, serverResponse2.data]);


  // Get investments
  useEffect(() => {
    if (serverResponse3.error.error) {
      // Fetch request failed
      console.log("Error::CoinTable::" + serverResponse3.error.msg);
    }
    else if (serverResponse3.data) {
      if (serverResponse3.data.result) {
        setUserList(generateUserTable(getUserInfo(serverResponse3.data.data, pricingData.current), classes));
        transactionData.current = serverResponse3.data.data;
      }
      else {
        // Error from server
        console.log("Error::CoinTable::" + serverResponse3.data.err);
      }
    }
  }, [serverResponse3.error, serverResponse3.data]);

  return (
    <div>
      <Typography variant="h4">Coins</Typography> <br/>
      {coinList}
      <br/>
      <br/>
      <br/>
      <br/>
      <Typography variant="h4">Users</Typography> <br/>
      {userList}
    </div>
  );
}

export default CoinTable

