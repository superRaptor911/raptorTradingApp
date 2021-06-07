import Paper from '@material-ui/core/Paper';
import InputLabel from '@material-ui/core/InputLabel';
import Select from '@material-ui/core/Select';
import TextField from '@material-ui/core/TextField'
import Button from '@material-ui/core/Button'
import MenuItem from '@material-ui/core/MenuItem';
import Typography from '@material-ui/core/Typography';
import { makeStyles } from '@material-ui/core/styles';
import {useEffect, useState} from 'react';
import {serverAddress} from '../../components/Utility';
import useFetch from '../../components/useFetch';
import LoadingCircle from '../../components/LoadingCircle';

const useStyles = makeStyles({
  root: {
    marginTop: 100,
    width: "90%",
    maxWidth: 600,
    display: 'block',
    marginLeft: 'auto',
    marginRight: 'auto',
    padding: 20,
    paddingTop: 30
  },
  title: {
    textAlign: 'center',
    marginBottom: 40,
  },
  active: {
    background: '#f4f4f4'
  },
  loading: {
    display: 'block',
    margin: 'auto',
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
  buttonContainer: {
    display: 'flex',
  },

});


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



const LoginUser = () => {
  const classes = useStyles();

  const [usersList, setUsersList] = useState();
  const [target, ] = useState({uri:  `${serverAddress}/users.php`, data:{ type: 'list'}});

  const serverResponse = useFetch(target);

  const [username, setUsername] = useState("");
  const [loadingComplete, setLoadingComplete] = useState(false);

  // Check server response
  useEffect(() => {
    if (serverResponse.error.error) {
      console.log("Error::AddTransaction::Failed to get user list");
    }
    else if (serverResponse.data) {
      setLoadingComplete(true);
      if (!serverResponse.data.result) {

      }
      else {
        setUsersList(generateItems(serverResponse.data.users));
      }
    }
  }, [serverResponse.error, serverResponse.data])

  if (!loadingComplete) {
    return (
      <LoadingCircle/>
    );
  }

  return (
    <Paper className={classes.root}>
      <Typography variant="h4" className={classes.title}>
        Login
      </Typography>

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

      <TextField className={classes.field}
        // value={avatar}
        // onChange={(e) => setAvatar(e.target.value)}
        label="OTP" 
        variant="outlined" 
        color="secondary" 
        fullWidth
      />

      <div className={classes.buttonContainer}>
        {/* Create Button */}
        <Button className={classes.field}
          type="submit" 
          color="secondary" 
          variant="contained"
          // onClick= {() => history.push("/adminmenu")}
        >
          Send OTP
        </Button>

        {/* Submit Button */}
        <Button className={classes.field}
          type="submit" 
          color="primary" 
          variant="contained"
          // disabled={submitDisabled}
          // onClick= {handleSubmit}
        >
          Submit
        </Button>
      </div>
    </Paper>
  );
}

export default LoginUser
