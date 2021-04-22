import {useEffect , useState} from "react";
import {useHistory} from "react-router";
import useFetch from "../components/useFetch";
import {getCookie, serverAddress} from '../components/Utility';
import Container from '@material-ui/core/Container'
import Typography from '@material-ui/core/Typography';
import { makeStyles } from '@material-ui/core'
import TextField from '@material-ui/core/TextField'
import Button from '@material-ui/core/Button'
import MenuItem from '@material-ui/core/MenuItem';
import Select from '@material-ui/core/Select';
import InputLabel from '@material-ui/core/InputLabel';
import Paper from '@material-ui/core/Paper';

const useStyles = makeStyles({
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
  container: {
    marginTop: 160,
    margin: 'auto',
    width: '90%',
    maxWidth: 600,
    backgroundColor: '#f4f4f4',
    padding: 20,
    paddingTop: 30
  },

  avatarContainer: {
    textAlign: 'center',
    width: 'min-content',
    margin: 'auto',
    marginTop: 10,
    marginBottom: 10
  },

  avatar: {
    margin: 'auto',
    width: 80,
    height: 80
  },

  buttonContainer: {
    display: 'flex',
  }
})

function validateUsername(username) {
  if (username.length < 4) {
    return false;
  }
  return true;
}

function generateItems(items) {
  let postsJsx = [];
  for (const item of items) {
    let postJsx = (
        <MenuItem value={item.name} key={item.name}>{item.name}</MenuItem>
    );
    postsJsx.push(postJsx);
  }
  return postsJsx;
}

const TransferFund = () => {
  const classes = useStyles()
  const [username, setUsername] = useState("");
  const [transactionType, setTransactionType] = useState(1);
  const [amount, setamount] = useState(0);
  const [fee, setFee] = useState(0);

  const [usersList, setUsersList] = useState();

  const [submitDisabled, setSubmitDisabled] = useState(false);
  const [target, setTarget] = useState({uri: "", data:{}});
  const [target3, setTarget3] = useState({uri:  `${serverAddress}/users.php`, data:{ type: 'list'}});

  const history = useHistory();

  // This variable is used to show status when submit button is pressed.
  const [currentStatus, setCurrentStatus] = useState("");

  const serverResponse = useFetch(target);
  const serverResponse3 = useFetch(target3);

  const handleSubmit = () => {
    setSubmitDisabled(true);
    if (!validateUsername(username)) {
      setCurrentStatus("Username should have atleast 4 characters and cannot have special characters");
      console.log("Login::CHECK_INPUT, not submitting data to server");
      setSubmitDisabled(false);
    } 
    else {
      setTarget({uri: `${serverAddress}/transction.php`, data: {
        type: 'fundTransfer',
        username: username,
        amount: amount,
        transtype: transactionType,
        fee: fee,
        externalTransfer: 1,
        hash: getCookie("hash")
      }});
      console.log("Login::ALL_OK, submitting data to server");
      setCurrentStatus("Loading ...");
    }
  }

  const handleLogin = () => {
    history.push('/');
  }

  // Check server response
  useEffect(() => {
    if (serverResponse.error.error) {
      setCurrentStatus(serverResponse.error.msg);
      setSubmitDisabled(false);
      console.log("error")
    }
    else if (serverResponse.data) {
      if (!serverResponse.data.result) {
        setCurrentStatus(serverResponse.data.err);
        setSubmitDisabled(false);
      }
      else {
        setCurrentStatus("");
        handleLogin();
      }
    }
  }, [serverResponse.error, serverResponse.data])


  // Check server response
  useEffect(() => {
    if (serverResponse3.error.error) {
      console.log("Error::AddTransaction::Failed to get user list");
    }
    else if (serverResponse3.data) {
      if (!serverResponse3.data.result) {
        setCurrentStatus(serverResponse3.data.err);
      }
      else {
        setUsersList(generateItems(serverResponse3.data.users));
      }
    }
  }, [serverResponse3.error, serverResponse3.data])


  return (
    <Paper className={classes.container}>

      <InputLabel id="username">Username</InputLabel>
      <Select
        labelId="username"
        id="usernameSelect"
        value={username}
        onChange={(e) => setUsername(e.target.value)}
        fullWidth
        className={classes.select}
      >
        {usersList}
      </Select>


      <InputLabel id="type">Type</InputLabel>
      <Select
        labelId="type"
        id="transtype"
        value={transactionType}
        onChange={(e) => setTransactionType(e.target.value)}
        fullWidth
        className={classes.select}
      >
        <MenuItem value={0}>WITHDRAWL</MenuItem>
        <MenuItem value={1}>DEPOSIT</MenuItem>
      </Select>


      <TextField className={classes.field}
        value={amount}
        onChange={(e) => setamount(e.target.value)}
        label="Sum" 
        variant="outlined" 
        color="secondary" 
        fullWidth
        type="number"
        required
      />

      <TextField className={classes.field}
        value={fee}
        onChange={(e) => setFee(e.target.value)}
        label="Fee" 
        variant="outlined" 
        color="secondary" 
        fullWidth
        type="number"
        required
      />

      <TextField className={classes.field}
        value={amount - fee * (transactionType * 2 - 1)}
        label="Total" 
        variant="outlined" 
        color="secondary" 
        fullWidth
        type="number"
        disabled
      />

      <Container className={classes.buttonContainer}>
        {/* Create Button */}
        <Button className={classes.field}
          type="submit" 
          color="secondary" 
          variant="contained"
          onClick= {() => history.push("/adminmenu")}
        >
          Admin Menu
        </Button>

        {/* Submit Button */}
        <Button className={classes.field}
          type="submit" 
          color="primary" 
          variant="contained"
          disabled={submitDisabled}
          onClick= {handleSubmit}
        >
          Submit
        </Button>

      </Container>
      <Typography variant="button" color="error">
        {currentStatus}
      </Typography>
    </Paper>
  );
}

export default TransferFund
