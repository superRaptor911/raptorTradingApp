import Table from '@material-ui/core/Table';
import TableBody from '@material-ui/core/TableBody';
import TableCell from '@material-ui/core/TableCell';
import TableContainer from '@material-ui/core/TableContainer';
import TableHead from '@material-ui/core/TableHead';
import TableRow from '@material-ui/core/TableRow';
import Paper from '@material-ui/core/Paper';
import Typography from '@material-ui/core/Typography';
import { makeStyles } from '@material-ui/core'
import Button from '@material-ui/core/Button'
import Avatar from '@material-ui/core/Avatar';
import LoadingCircle from './LoadingCircle';
import {memo} from 'react';

const useStyles = makeStyles({
  root: {
    marginTop: 40,
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
  },
  pieChartContainer: {
        marginTop: 20,
  },
})


const genTransactionTable = (data, classes) => {
  if (data) {
    return (
      <TableContainer component={Paper}>
        <Table  aria-label="simple table">
          <TableHead>
            <TableRow>
              <TableCell>Name</TableCell>
              <TableCell >Coin Name</TableCell>
              <TableCell align="center">Coin Count</TableCell>
              <TableCell align="center">Coin Price (INR)</TableCell>
              <TableCell align="center">Total (INR)</TableCell>
              <TableCell align="center">Type</TableCell>
              <TableCell align="center">Edit?</TableCell>
            </TableRow>
          </TableHead>
          <TableBody>
            {data.map((row) => (
              <TableRow key={row.id}>
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
                <TableCell align="center"> <Button color="secondary">Edit</Button> </TableCell>
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

const UserTransactionTable = ({transctionData}) => {
  const classes = useStyles()
  const table = genTransactionTable(transctionData, classes);

  return (
    <div className={classes.root}>
      <Typography variant="h4">
        Coin Transactions
      </Typography>
      {table}
    </div>
  );
}

export default memo(UserTransactionTable) 
