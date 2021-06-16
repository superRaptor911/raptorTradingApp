import Button from '@material-ui/core/Button';
import {useEffect , useState} from "react";
import useFetch from "../components/hooks/useFetch";
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
import {Link, useHistory} from "react-router-dom";

const useStyles = makeStyles((theme) => ({
  root: {
    width:'90%',
    maxWidth: 1200,
    marginTop: 150,
    marginBottom: 150,
    marginRight: 'auto',
    marginLeft: 'auto',
    display: 'block'
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
    color: 'red',
    fontWeight: 'bold'
  },
  green: {
    color: 'green',
    fontWeight: 'bold'
  }
}));


const generateTransactionTable = (data, classes, history) => {
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
            <TableCell align="center">Status</TableCell>
            <TableCell align="center">Edit?</TableCell>
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
                {(row.transType == 1) ? "DEPOSIT" : "WITHDRAW"}
              </TableCell>
              <TableCell align="center" className={(row.transStatus == 1) ? classes.green : classes.red}>
                {(row.transType == 1) ? "CONFIRMED" : "PENDING"}
              </TableCell>
              <TableCell align="center"> 
                <Button variant="outlined" color="primary" onClick={() => {history.push("/edittransaction/" + row.id)}}>EDIT</Button> 
              </TableCell>
            </TableRow>
          ))}
        </TableBody>
      </Table>
    </TableContainer>
  );
}





const EditTransactionMenu = () => {
  const classes = useStyles()
  const [target, setTarget] = useState({uri: `${serverAddress}/transction.php`, data: {type: 'list'}});
  const history = useHistory();

  // This variable is used to show status when submit button is pressed.
  const [currentStatus, setCurrentStatus] = useState("");
  const serverResponse = useFetch(target);
  const [transactionListJsx, setTransactionListJsx] = useState();

  // Check server response
  useEffect(() => {
    if (serverResponse.error.error) {
      setCurrentStatus(serverResponse.error.msg);
      console.log("error")
    }
    else if (serverResponse.data) {
      if (!serverResponse.data.result) {
        setCurrentStatus(serverResponse.data.err);
      }
      else {
        setCurrentStatus("");
        setTransactionListJsx(generateTransactionTable(serverResponse.data.trans, classes, history));
      }
    }
  }, [serverResponse.error, serverResponse.data])


  return (
    <div className={classes.root}>
      <Typography color="error">
        {currentStatus}
      </Typography>

        {transactionListJsx}
    </div>
  );
}

export default EditTransactionMenu
