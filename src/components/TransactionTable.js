import {useEffect , useState} from "react";
import useFetch from "../components/useFetch";
import {serverAddress} from '../components/Utility';
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
    color: 'red',
    fontWeight: 'bold'
  },
  green: {
    color: 'green',
    fontWeight: 'bold'
  }
}));


const generateTransactionTable = (data, classes) => {
  return (
    <TableContainer component={Paper}>
      <Table  aria-label="simple table">
        <TableHead>
          <TableRow>
            <TableCell>Name</TableCell>
            <TableCell >Coin Name</TableCell>
            <TableCell align="center">Coin Count</TableCell>
            <TableCell align="center">Buying Price (INR)</TableCell>
            <TableCell align="center">Total (INR)</TableCell>
            <TableCell align="center">Type</TableCell>
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
                    src={row.userAvatar}
                    className={classes.icon}
                  />
                  <Typography className={classes.iconText}>
                    {row.username}
                  </Typography>
                </div>
                </Link>
              </TableCell>

              <TableCell align="right">
                <div className={classes.iconContainer}>
                  <Avatar
                    alt={row.coin}
                    src={row.coinAvatar}
                    className={classes.icon}
                  />
                  <Typography className={classes.iconText}>
                    {row.coin}
                  </Typography>
                </div>
              </TableCell>
              <TableCell align="center">{row.coinCount}</TableCell>
              <TableCell align="center">{parseFloat(row.cost).toFixed(2)}</TableCell>
              <TableCell align="center">{(row.cost * row.coinCount).toFixed(2)}</TableCell>
              <TableCell align="center" className={(row.transType == 1) ? classes.green : classes.red}>
                {(row.transType == 1) ? "BUY" : "SELL"}
              </TableCell>
            </TableRow>
          ))}
        </TableBody>
      </Table>
    </TableContainer>
  );
}

const generateFundTransferHistoryTable = (data, classes) => {
  return (
    <TableContainer component={Paper}>
      <Table  aria-label="simple table">
        <TableHead>
          <TableRow>
            <TableCell>Name</TableCell>
            <TableCell align="center">Amount</TableCell>
            <TableCell align="center">Fee</TableCell>
            <TableCell align="center">Type</TableCell>
            <TableCell align="center">Time</TableCell>
          </TableRow>
        </TableHead>
        <TableBody>
          {data.map((row) => (
            <TableRow key={row.time}>
              <TableCell component="th" scope="row">
                <div className={classes.iconContainer}>
                  <Avatar
                    alt={row.username}
                    src={row.userAvatar}
                    className={classes.icon}
                  />
                  <Typography className={classes.iconText}>
                    {row.username}
                  </Typography>
                </div>
              </TableCell>
              <TableCell align="center">{parseFloat(row.amount).toFixed(2)}</TableCell>
              <TableCell align="center">{parseFloat(row.fee).toFixed(2)}</TableCell>
              <TableCell align="center" className={(row.transType == 1) ? classes.green : classes.red}>
                {(row.transType == 1) ? "DEPOSIT" : "WITHDRAW"}
              </TableCell>
              <TableCell align="center">{row.time}</TableCell>
            </TableRow>
          ))}
        </TableBody>
      </Table>
    </TableContainer>
  );
}

const TransactionTable = () => {
  const classes = useStyles();
  const [target, ] = useState({uri:  `${serverAddress}/transction.php`, data: {type: "list"}});
  const [target2, ] = useState({uri:  `${serverAddress}/transction.php`, data: {type: "fundTransferHistory"}});

  const [currentStatus, setCurrentStatus] = useState("LOADING ...");
  const [currentStatus2, setCurrentStatus2] = useState("LOADING ...");

  const [transctionList, setTransctionList] = useState();
  const [fundTransferHistory, setFundTransferHistory] = useState();
  const serverResponse = useFetch(target);
  const serverResponse2 = useFetch(target2);


  useEffect(() => {
    if (serverResponse.error.error) {
      // Fetch request failed
      setCurrentStatus(serverResponse.error.msg);
    }
    else if (serverResponse.data) {
      if (serverResponse.data.result) {
        setCurrentStatus("");
        setTransctionList(generateTransactionTable(serverResponse.data.trans, classes));
      }
      else {
        // Error from server
        setCurrentStatus(serverResponse.data.err);
      }
    }
  }, [serverResponse.error, serverResponse.data]);


  useEffect(() => {
    if (serverResponse2.error.error) {
      console.log("Error::TransactionTable::" + serverResponse2.error.msg);
      setCurrentStatus2(serverResponse2.error.msg);
    }
    else if (serverResponse2.data) {
      if (serverResponse2.data.result) {
        setCurrentStatus2("");
        setFundTransferHistory(generateFundTransferHistoryTable(serverResponse2.data.history, classes));
      }
      else {
        // Error from server
        setCurrentStatus2(serverResponse2.data.err);
      }
    }
  }, [serverResponse2.error, serverResponse2.data]);


  return (
    <div>
      <Typography variant="h4">Coin Transactions</Typography> <br/>
      {transctionList}
      <br/>
      <br/>
      <br/>
      <Typography variant="h4">Fund Transfer History</Typography><br/>
      {fundTransferHistory}
    </div>
  );
}

export default TransactionTable
