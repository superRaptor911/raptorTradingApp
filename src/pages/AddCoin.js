import {useEffect , useState} from "react";
import {useHistory} from "react-router";
import useFetch from "../components/useFetch";
import {checkForSpecialChars, getCookie, serverAddress} from '../components/Utility';
import Container from '@material-ui/core/Container'
import Typography from '@material-ui/core/Typography';
import { makeStyles } from '@material-ui/core'
import TextField from '@material-ui/core/TextField'
import Button from '@material-ui/core/Button'
import Avatar from '@material-ui/core/Avatar';

const useStyles = makeStyles({
  field: {
    marginTop: 20,
    marginBottom: 20,
    display: 'block',
    marginLeft: 'auto',
    marginRight: 'auto',
  },

  container: {
    marginTop: 100,
    margin: 'auto',
    width: '90%',
    maxWidth: 600
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
  if (username.length < 2) {
    return false;
  }
  return true
}

const AddCoin = () => {
  const classes = useStyles()
  const [coinName, setCoinName] = useState('');
  const [coinId, setCoinId] = useState('');
  const [avatar, setAvatar] = useState('');
  const [submitDisabled, setSubmitDisabled] = useState(false);
  const [target, setTarget] = useState({uri: "", data:{}});

  const history = useHistory();

  // This variable is used to show status when submit button is pressed.
  const [currentStatus, setCurrentStatus] = useState("");

  const serverResponse = useFetch(target);

  const handleSubmit = () => {
    setSubmitDisabled(true);
    if (!validateUsername(coinName)) {
      setCurrentStatus("Username should have atleast 4 characters and cannot have special characters");
      console.log("Login::CHECK_INPUT, not submitting data to server");
      setSubmitDisabled(false);
    } 
    else {
      setTarget({uri: `${serverAddress}/coin.php`, data: {
        type: 'register',
        name: coinName,
        coinId: coinId,
        avatar: avatar,
        hash: getCookie('hash')
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

  return (
    <Container className={classes.container}>
      {/* heading */}
      <Container className={classes.avatarContainer}>
        <Avatar
          className={classes.avatar}
          alt={coinName}
          src={avatar}
        />
        <Typography>{coinName}</Typography>
      </Container>
      {/* Username */}
      <TextField className={classes.field}
        onChange={(e) => setCoinName(e.target.value)}
        label="Coin Name" 
        variant="outlined" 
        color="secondary" 
        fullWidth
        required
      />

      {/* Username */}
      <TextField className={classes.field}
        onChange={(e) => setCoinId(e.target.value)}
        label="Coin id" 
        variant="outlined" 
        color="secondary" 
        fullWidth
        required
      />

      {/* Preview Img avatar */}
      <TextField className={classes.field}
        onChange={(e) => setAvatar(e.target.value)}
        label="Avatar Image (Link)" 
        variant="outlined" 
        color="secondary" 
        fullWidth
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
    </Container>
  );
}

export default AddCoin
