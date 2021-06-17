import useServerResponse from "./hooks/useServerResponse";
import { makeStyles } from '@material-ui/core'
import Typography from '@material-ui/core/Typography';
import Avatar from '@material-ui/core/Avatar';
import Table from '@material-ui/core/Table';
import TableBody from '@material-ui/core/TableBody';
import TableCell from '@material-ui/core/TableCell';
import TableContainer from '@material-ui/core/TableContainer';
import TableHead from '@material-ui/core/TableHead';
import TableRow from '@material-ui/core/TableRow';
import Paper from '@material-ui/core/Paper';
import LoadingCircle from "./LoadingCircle";


const useStyles = makeStyles({
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
  },
})

const genFundTransferHistoryTable = (data, classes) => {
  if (data) {
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

  return (
    <LoadingCircle/>
  );
}

const UserFundTransferTable = ({username}) => {
  const classes = useStyles();
  const fundTransferData = useServerResponse('transction.php', {type: 'fundTransferHistory', username: username}, 'history');
  const table = genFundTransferHistoryTable(fundTransferData, classes);

  return (
    <div>
      <Typography variant="h4">
        Fund Transfer History
      </Typography>
      {table}
    </div>
  );
}

export default UserFundTransferTable
