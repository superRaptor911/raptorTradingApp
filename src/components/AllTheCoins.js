import {useEffect , useRef, useState} from "react";
import Table from '@material-ui/core/Table';
import Typography from '@material-ui/core/Typography';
import { makeStyles } from '@material-ui/core'
import Paper from '@material-ui/core/Paper';
import TableBody from '@material-ui/core/TableBody';
import TableCell from '@material-ui/core/TableCell';
import TableContainer from '@material-ui/core/TableContainer';
import TableHead from '@material-ui/core/TableHead';
import TableRow from '@material-ui/core/TableRow';

function genCoinsTable(data) {
  return (
    <Paper>
      <TableContainer>
        <Table  aria-label="simple table">
          <TableHead>
            <TableRow>
              <TableCell>Coin</TableCell>
              <TableCell align="center">Count</TableCell>
            </TableRow>
          </TableHead>
          <TableBody>
            { Object.keys(data).map((key, id) => (
              <TableRow key={id}>
                <TableCell align="center">{key}</TableCell>
                <TableCell align="center">{data[key]}</TableCell>
              </TableRow>
            ))}
          </TableBody>
        </Table>
      </TableContainer>
    </Paper>
  );  
}


const AllTheCoins = ({data}) => {
  const [currentStatus, setCurrentStatus] = useState("LOADING ...");
  const [table, setTable] = useState();

  useEffect(() => {
    if (data) {
      if (data.result) {
        setCurrentStatus("");
        setTable(genCoinsTable(data.coins));
      }
      else {
        // Error from server
        setCurrentStatus(data.data.err);
      }
    }
  }, [data]);

  console.log("Pwdddd");

  return (
    <div>
      <Typography variant="h4">
        Coins
      </Typography>

      <Typography variant="button" color="error">
        {currentStatus}
      </Typography>
      {table}
    </div>
  );
}

export default AllTheCoins
