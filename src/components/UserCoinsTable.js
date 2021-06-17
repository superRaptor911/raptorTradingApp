import Table from '@material-ui/core/Table';
import Chart from "react-google-charts";
import { makeStyles } from '@material-ui/core'
import Avatar from '@material-ui/core/Avatar';
import Typography from '@material-ui/core/Typography';
import TableBody from '@material-ui/core/TableBody';
import {Link} from "react-router-dom";
import TableCell from '@material-ui/core/TableCell';
import TableContainer from '@material-ui/core/TableContainer';
import TableHead from '@material-ui/core/TableHead';
import TableRow from '@material-ui/core/TableRow';
import Paper from '@material-ui/core/Paper';
import useUserCoinData from './hooks/useUserCoinData';
import {memo} from 'react';
import LoadingCircle from './LoadingCircle';


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
})

const genUserCoinsTable = (data, classes) => {
  if (data) {
    return (
      <TableContainer component={Paper}>
        <Table  aria-label="simple table">
          <TableHead>
            <TableRow>
              <TableCell>Coin ID</TableCell>
              <TableCell align="center">Coin Count</TableCell>
              <TableCell align="center">Investment</TableCell>
              <TableCell align="center">Profit</TableCell>
              <TableCell align="center">Profit %</TableCell>
            </TableRow>
          </TableHead>
          <TableBody>
            {data.map((row) => (
              <TableRow key={row.id}>
                <TableCell component="th" scope="row">
                  <Link to={"/coininfo/" + row.coin}>
                    <div className={classes.iconContainer}>
                      <Avatar
                        alt={row.coinInfo.name}
                        src={row.coinInfo.avatar}
                        className={classes.icon}
                      />
                      <Typography className={classes.iconText}>
                        {row.coinInfo.name}
                      </Typography>
                    </div>
                  </Link>
                </TableCell>
                <TableCell align="center">{row.count}</TableCell>
                <TableCell align="center">{row.investment}</TableCell>
                <TableCell align="center" className={(row.percent > 0) ? classes.green : classes.red}>{row.profit}</TableCell>
                <TableCell align="center" className={(row.percent > 0) ? classes.green : classes.red}>{row.percent}</TableCell>
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


function genPieChart(coinData, classes) {
  if (coinData) {
    let data = [];
    data.push(['coin', 'investment']);
    for (let i of coinData) {
      data.push([i.coinInfo.name, parseFloat(i.investment) ]);
    }
    console.log(data);
    return (
      <Chart
        height={350}
        className={classes.pieChart}
        chartType="PieChart"
        loader={<div>Loading Chart</div>}
        data={
          data
        }
        options={{
          title: 'Investments',
          is3D: true,
        }}
        rootProps={{ 'data-testid': '2' }}
      />
    ); 
  }

  return (
    <LoadingCircle/>
  );
}

const UserCoinsTable = ({username, coinPricing, transctionHistory}) => {
  const classes = useStyles()
  const userCoinData = useUserCoinData(username, coinPricing, transctionHistory);
  const table = genUserCoinsTable(userCoinData, classes);
  const chart = genPieChart(userCoinData, classes);

  return (
    <div className={classes.root}>
      <Typography variant="h4">
        Coins
      </Typography>
      {chart}
      <br/>
      <Typography variant="h4">
        Coins
      </Typography>
      {table}
    </div>
  );

}

export default memo(UserCoinsTable)
