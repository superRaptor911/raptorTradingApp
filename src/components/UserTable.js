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
  root: {
    marginBottom: 50,
  },
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




function getUserInfo(transctionList, pricing) {
  if (!transctionList) {
    return [];
  }
  let dict = {};
  for (let t of transctionList) {
    dict[t.username] = {
      name: t.username,
      avatar: t.userAvatar,
      investment: parseFloat(t.investment).toFixed(2),
      amount: parseFloat(t.amount).toFixed(2),
      value: parseFloat(t.amount),
      profit: 0,
      percent: 0
    };
     let str = "0";
    dict[t.username].investment = Math.max(dict[t.username].investment, 0);
    if (pricing) {
      for (let i of t.coins) {
        let coin = pricing[i.coin];
        if (coin) {
          dict[t.username].value += coin.last * i.count;
          str = str + " + " + coin.last * i.count;
        }
      }

      dict[t.username].profit = dict[t.username].value - dict[t.username].investment;
      dict[t.username].percent = (dict[t.username].value / dict[t.username].investment ) * 100 - 100;
      dict[t.username].profit = dict[t.username].profit.toFixed(2);
      dict[t.username].percent = dict[t.username].percent.toFixed(2);
      dict[t.username].value = dict[t.username].value.toFixed(2);
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

              <TableCell align="center">{row.investment}</TableCell>
              <TableCell align="center">{row.value}</TableCell>
              <TableCell align="center" className={(row.profit > 0) ? classes.green : classes.red}>{row.profit}</TableCell>
              <TableCell align="center" className={(row.percent > 0) ? classes.green : classes.red}>{row.percent + "%"}</TableCell>
            </TableRow>
          ))}
        </TableBody>
      </Table>
    </TableContainer>
  );
}


const UserTable = ({pricingData}) => {
  const classes = useStyles();
  const [target, ] = useState({uri:  `${serverAddress}/transction.php`, data: {type: "investmentNcoins"}});
  const [userList, setUserList] = useState();

  const serverResponse3 = useFetch(target);

  const transactionData = useRef([]);

  // Get investments
  useEffect(() => {
    if (serverResponse3.error.error) {
      console.log("Error::CoinTable::" + serverResponse3.error.msg);
    }
    else if (serverResponse3.data) {
      if (serverResponse3.data.result) {
        setUserList(generateUserTable(getUserInfo(serverResponse3.data.data, pricingData), classes));
        transactionData.current = serverResponse3.data.data;
      }
      else {
        // Error from server
        console.log("Error::CoinTable::" + serverResponse3.data.err);
      }
    }
  }, [serverResponse3.error, serverResponse3.data]);

  useEffect(() => {
    setUserList(generateUserTable(getUserInfo(transactionData.current, pricingData), classes));
  }, [pricingData])

  return (
    <div className={classes.root}>
      <Typography variant="h4">Users</Typography> <br/>
      {userList}
    </div>
  );
}

export default UserTable
