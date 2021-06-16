import {useEffect , useState} from "react";
import {useHistory} from "react-router";
import useFetch from "../hooks/useFetch";
import {getCookie, serverAddress} from '../Utility';
import Typography from '@material-ui/core/Typography';
import { makeStyles } from '@material-ui/core'
import TextField from '@material-ui/core/TextField'
import Button from '@material-ui/core/Button'
import MenuItem from '@material-ui/core/MenuItem';
import Select from '@material-ui/core/Select';
import InputLabel from '@material-ui/core/InputLabel';
import Paper from '@material-ui/core/Paper';

const useStyles = makeStyles({
  root: {
    marginTop: 20,
    marginLeft: 10,
    marginRight: 10,
    padding: 10,
    flex: 1,
  },
  field: {
    marginTop: 20,
    marginBottom: 20,
    display: 'block',
    marginLeft: 'auto',
    marginRight: 'auto',
  },
  select: {
    marginBottom: 40,
    display: 'block',
    marginLeft: 'auto',
    marginRight: 'auto',
  },
  avatarContainer: {
    textAlign: 'center',
    width: 'min-content',
    margin: 'auto',
    marginTop: 10,
    marginBottom: 10
  },

})

const CoinTransaction = ({symbol}) => {
  const classes = useStyles()
  const [transactionType, setTransactionType] = useState(1);
  const [coinCount, setCoinCount] = useState(0);

  return (
    <Paper className={classes.root}>
      <Typography variant="h4">
        {symbol}
      </Typography>
      <br/>
      <InputLabel id="type">Type</InputLabel>
      <Select
        labelId="type"
        id="transtype"
        value={transactionType}
        onChange={(e) => setTransactionType(e.target.value)}
        fullWidth
        className={classes.select}
      >
        <MenuItem value={0}>SELL</MenuItem>
        <MenuItem value={1}>BUY</MenuItem>
      </Select>

      <TextField className={classes.field}
        value={coinCount}
        onChange={(e) => setCoinCount(e.target.value)}
        label="Coin count" 
        variant="outlined" 
        color="secondary" 
        fullWidth
        type="number"
        required
      />

      {/* Submit Button */}
      <Button className={classes.field}
        type="submit" 
        color="primary" 
        variant="contained"
      >
        Submit
      </Button>
    </Paper>
  );
}

export default CoinTransaction
