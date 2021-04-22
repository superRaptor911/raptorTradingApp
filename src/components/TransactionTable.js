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
              <TableCell align="center">{row.cost}</TableCell>
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

const TransactionTable = () => {
  const classes = useStyles();
  const [target, ] = useState({uri:  `${serverAddress}/transction.php`, data: {type: "list"}});
  const [transctionList, setTransctionList] = useState();
  const serverResponse = useFetch(target);


  useEffect(() => {
    if (serverResponse.error.error) {
      // Fetch request failed
      console.log("Error::TransactionTable::" + serverResponse.error.msg);
    }
    else if (serverResponse.data) {
      if (serverResponse.data.result) {
        setTransctionList(generateTransactionTable(serverResponse.data.trans, classes));
      }
      else {
        // Error from server
        console.log("Error::TransactionTable::" + serverResponse.data.err);
      }
    }
  }, [serverResponse.error, serverResponse.data]);


  return (
    <div>
      <Typography variant="h4">Coin Transactions</Typography> <br/>
      {transctionList}
    </div>
  );
}

export default TransactionTable
