import {useEffect , useRef, useState} from "react";
import useFetch from "../components/useFetch";
import {serverAddress, sortBy} from '../components/Utility';
import Typography from '@material-ui/core/Typography';
import { makeStyles } from '@material-ui/core'
import Paper from '@material-ui/core/Paper';
import TextField from '@material-ui/core/TextField'
import Button from '@material-ui/core/Button'
import Table from '@material-ui/core/Table';
import TableBody from '@material-ui/core/TableBody';
import TableCell from '@material-ui/core/TableCell';
import TableContainer from '@material-ui/core/TableContainer';
import TableHead from '@material-ui/core/TableHead';
import TableRow from '@material-ui/core/TableRow';
import Avatar from '@material-ui/core/Avatar';

const useStyles = makeStyles({
  root: {
    marginTop: 100,
    margin: 'auto',
    width: '90%',
    maxWidth: 1000,
    backgroundColor: '#f4f4f4',
    padding: 20,
  },
  title : {
    textAlign: 'center',
  },
  field: {
    marginTop: 20,
    marginBottom: 20,
    display: 'block',
    marginLeft: 'auto',
    marginRight: 'auto',
  },
  paper: {
    marginTop: 100,
  },
  bullet: {
    fontSize: 24,
  }
});

function genTable(data) {
  return (
    <TableContainer component={Paper}>
      <Table  aria-label="simple table">
        <TableHead>
          <TableRow>
            {data.columns.map((column, id) => (
              <TableCell align="center" key={id}>{column}</TableCell>
            ))}
          </TableRow>
        </TableHead>
        <TableBody>
          {data.rows.map((row) => (
            <TableRow key={row.time}>
              {data.columns.map((column, id) => (
                <TableCell align="center" key={id}>{row[column]}</TableCell>
              ))}
            </TableRow>
          ))}
        </TableBody>
      </Table>
    </TableContainer>
  );
}

const DatabaseQuery = () => {
  const classes = useStyles();
  const [query, setQuery] = useState("");
  const [target, setTarget] = useState({uri: "", data:{}});

  // This variable is used to show status when submit button is pressed.
  const [currentStatus, setCurrentStatus] = useState("");
  const serverResponse = useFetch(target);

  const [tableJsx, setTableJsx] = useState();

  const handleExecutePress = () => {
    setTarget({uri:  `${serverAddress}/queryDatabase.php`, data:{ type: "execute" ,query: query }});
    setCurrentStatus("Loading .....");
  }

  // Get coins
  useEffect(() => {
    if (serverResponse.error.error) {
      // Fetch request failed
      setCurrentStatus(serverResponse.error.msg);
    }
    else if (serverResponse.data) {
      if (serverResponse.data.result) {
        setCurrentStatus("");
        setTableJsx(genTable(serverResponse.data));
      }
      else {
        // Error from server
        setCurrentStatus(serverResponse.data.err);
      }
    }
  }, [serverResponse.error, serverResponse.data]);


  return (
    <div className={classes.root}>
      <Typography variant="h4" className={classes.title}>
        MySQL DATABASE
      </Typography>

      <TextField className={classes.field}
        value={query}
        onChange={(e) => setQuery(e.target.value)}
        label="MySQL Query" 
        variant="outlined" 
        color="secondary" 
        multiline
        rows={5}
        fullWidth
        required
      />
      {/* Execute Button */}
      <Button className={classes.field}
        type="submit" 
        color="primary" 
        variant="contained"
        onClick= {handleExecutePress}
      >
        Execute
      </Button>

      <Typography variant="button" color="error">
        {currentStatus}
      </Typography>
      {tableJsx}

      <Paper className={classes.paper}>
        <Typography variant="h5" className={classes.title}>
          Tables
        </Typography>
        <ul>
          <li className={classes.bullet}>users</li>
          <li className={classes.bullet}>coins</li>
          <li className={classes.bullet}>transctions</li>
          <li className={classes.bullet}>userCoins</li>
          <li className={classes.bullet}>investments</li>
          <li className={classes.bullet}>wallet</li>
          <li className={classes.bullet}>fundTransferHistory</li>
          <li className={classes.bullet}>donations</li>
        </ul>
      </Paper>
    </div>
  );
}

export default DatabaseQuery
