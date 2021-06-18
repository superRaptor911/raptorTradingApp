import {useState} from "react";
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
import useInvestmentData from "./hooks/useInvestmentData";

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

const generateUserTable = (data, classes) => {
  if (!data) {
    return;
  }

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
  const investmentData = useInvestmentData(pricingData);
  const userList = generateUserTable(investmentData, classes);

  // console.log("Rendering users")
  return (
    <div className={classes.root}>
      <Typography variant="h4">Users</Typography> <br/>
      {userList}
    </div>
  );
}

export default UserTable
