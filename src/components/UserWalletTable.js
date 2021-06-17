import useServerResponse from "./hooks/useServerResponse";
import Typography from '@material-ui/core/Typography';
import Table from '@material-ui/core/Table';
import TableBody from '@material-ui/core/TableBody';
import TableCell from '@material-ui/core/TableCell';
import TableContainer from '@material-ui/core/TableContainer';
import TableHead from '@material-ui/core/TableHead';
import TableRow from '@material-ui/core/TableRow';
import Paper from '@material-ui/core/Paper';
import LoadingCircle from "./LoadingCircle";
import {memo} from "react";

const genUserWalletTable = (data) => {
  if (data) {
    return (
      <TableContainer component={Paper}>
        <Table  aria-label="simple table">
          <TableHead>
            <TableRow>
              <TableCell>User</TableCell>
              <TableCell align="center">Wallet Balance(INR)</TableCell>
            </TableRow>
          </TableHead>
          <TableBody>
            <TableRow>
              <TableCell component="th" scope="row">{data.username}</TableCell>
              <TableCell align="center">{parseFloat(data.amount).toFixed(2)}</TableCell>
            </TableRow>
          </TableBody>
        </Table>
      </TableContainer>
    );
  }

  return (
    <LoadingCircle/>
  );
}

const UserWalletTable = ({username}) => {
  const userWallet = useServerResponse('transction.php', {type: 'walletInfo', username: username}, 'wallet');
  const table = genUserWalletTable(userWallet);

  return (
    <div>
      <br/>
      <Typography variant="h4">
        Wallet
      </Typography>
      {table}
    </div>
  );
}

export default memo(UserWalletTable) 
