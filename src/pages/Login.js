import {useEffect, useState} from "react";
import {useHistory} from "react-router";
import useFetch from "../components/useFetch";
import {serverAddress} from '../components/Utility'
import Container from '@material-ui/core/Container'
import Typography from '@material-ui/core/Typography';
import { makeStyles } from '@material-ui/core'
import TextField from '@material-ui/core/TextField'
import Button from '@material-ui/core/Button'

const useStyles = makeStyles({
  field: {
    marginTop: 20,
    marginBottom: 20,
    display: 'block',
    marginLeft: 'auto',
    marginRight: 'auto',
  },

  container: {
    margin: 'auto',
    width: '90%',
    maxWidth: 600,
    marginTop: 120
  },
  buttonContainer: {
    display: 'flex',
  }
})


const Login = () => {
  const classes = useStyles()
  // Username, Password
  const [userName, setUserName] = useState('');
  const [password, setPassword] = useState("");

  // State to hold submit button press
  const [submitDisabled, setSubmitDisabled] = useState(false);
  // Our Fetch target
  const [target, setTarget] = useState({uri: "", data:{}});

  // Hook for navigation, to redirect to another page
  const history = useHistory();
  // This variable is used to show status when submit button is pressed.
  const [currentStatus, setCurrentStatus] = useState("");

  // Fetch response
  const serverResponse = useFetch(target);

  // Called when submit button is pressed
  const handleSubmit = () => {
    setSubmitDisabled(true);
    setTarget({uri: `${serverAddress}/users.php`, data: {type: "login", name: userName, pass: password}});
    console.log("button pressed");
  }

  const handleCreateAccount = () => {
    history.push('/signup')
  }

  // Called when Login success
  const onSuccess = () => {
    // Set cookies
    document.cookie = `username=${userName}; path=/`;
    document.cookie = `hash=${serverResponse.data.hash}; path=/`;
    window.location.replace("/");
  }

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

        if (serverResponse.data.err === "EMAIL_UNVERIFIED") {
          history.push("/join/verify/" + serverResponse.data.email);
        }
      }
      else {
        setCurrentStatus("");
        onSuccess();
      }
    }
  }, [serverResponse.error, serverResponse.data])


  return (
    <Container className={classes.container}>
      {/* heading */}
      <Typography variant="h3">
        Login
      </Typography>

      {/* Username */}
      <TextField className={classes.field}
        onChange={(e) => setUserName(e.target.value)}
        label="Username" 
        variant="outlined" 
        color="secondary" 
        fullWidth
        required
      />


      {/* Password */}
      <TextField className={classes.field}
        onChange={(e) => setPassword(e.target.value)}
        label="Password"
        variant="outlined"
        color="secondary"
        type="password"
        fullWidth
        required
      />

      <Container className={classes.buttonContainer}>
        {/* Create Button */}
        <Button className={classes.field}
          type="submit" 
          color="secondary" 
          variant="contained"
          onClick= {handleCreateAccount}
        >
          Create Account?
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
      <Typography variant="button" color="error" >
        {currentStatus}
      </Typography>
    </Container>
  );
}

export default Login
