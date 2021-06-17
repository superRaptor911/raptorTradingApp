import {useEffect , useState} from "react";
import {getCachedValueIfNull, readableValue} from '../components/Utility';
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
import useServerResponse from "./hooks/useServerResponse";

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
  if (!data) {
    return;
  }

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

const CoinTable = ({pricingData}) => {
  const classes = useStyles();
  const [coinList, setCoinList] = useState();
  const coinData = useServerResponse('coin.php', {type: "list"}, 'coins');

  useEffect(() => {
    const data = getCachedValueIfNull("coinData", coinData, []);
    setCoinList(generateCoinTable(data, pricingData, classes));
  }, [pricingData, coinData]);

  return (
    <div>
      <Typography variant="h4">Coins</Typography> <br/>
      {coinList}
      <br/>
      <br/>
    </div>
  );
}

export default CoinTable

