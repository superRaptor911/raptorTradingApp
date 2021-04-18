import {useEffect , useState} from "react";
import {useHistory, useParams} from "react-router";
import useFetch from "../components/useFetch";
import {serverAddress} from '../components/Utility';
import Container from '@material-ui/core/Container'
import Typography from '@material-ui/core/Typography';
import { makeStyles } from '@material-ui/core'
import TextField from '@material-ui/core/TextField'
import Button from '@material-ui/core/Button'
import Avatar from '@material-ui/core/Avatar';
import Table from '@material-ui/core/Table';
import TableBody from '@material-ui/core/TableBody';
import TableCell from '@material-ui/core/TableCell';
import TableContainer from '@material-ui/core/TableContainer';
import TableHead from '@material-ui/core/TableHead';
import TableRow from '@material-ui/core/TableRow';
import Paper from '@material-ui/core/Paper';

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
    maxWidth: 900
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

  button: {
    display: 'block',
    marginLeft: 'auto',
    marginRight: 'auto'
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
  }
})


const generateTransactionTable = (data, classes) => {
  return (
    <TableContainer component={Paper}>
      <Table  aria-label="simple table">
        <TableHead>
          <TableRow>
            <TableCell>Name</TableCell>
            <TableCell >Coin Name</TableCell>
            <TableCell align="center">Coin Count</TableCell>
            <TableCell align="center">Buying Price (INR)</TableCell>
            <TableCell align="center">Total (INR)</TableCell>
            <TableCell align="center">Delete?</TableCell>
          </TableRow>
        </TableHead>
        <TableBody>
          {data.map((row) => (
            <TableRow key={row.id}>
              <TableCell component="th" scope="row">
                <div className={classes.iconContainer}>
                  <Avatar
                    alt={row.username}
                    src={row.userAvatar}
                    className={classes.icon}
                  />
                  <Typography className={classes.iconText}>
                    {row.username}
                  </Typography>
                </div>
              </TableCell>

              <TableCell align="right">
                <div className={classes.iconContainer}>
                  <Avatar
                    alt={row.coin}
                    src={row.coinAvatar}
                    className={classes.icon}
                  />
                  <Typography className={classes.iconText}>
                    {row.coin}
                  </Typography>
                </div>
              </TableCell>
              <TableCell align="center">{row.coinCount}</TableCell>
              <TableCell align="center">{row.cost}</TableCell>
              <TableCell align="center">{row.cost * row.coinCount}</TableCell>
              <TableCell align="center"> <Button color="secondary">Delete</Button> </TableCell>
            </TableRow>
          ))}
        </TableBody>
      </Table>
    </TableContainer>
  );
}

const UserInfo = () => {
  const {userName} = useParams();
  const classes = useStyles()

  const [userInfo, setUserInfo] = useState({
    username: "",
    email: "",
    avatar: ""
  });

  const [target, ] = useState({uri: `${serverAddress}/users.php`, data: {
        type: 'info',
        name: userName,
      }});

  const [target2, ] = useState({uri: `${serverAddress}/transction.php`, data: {
        type: 'info',
        username: userName,
      }});

  // This variable is used to show status when submit button is pressed.
  const [currentStatus, setCurrentStatus] = useState("");
  const [transctionTable, setTransctionTable] = useState();

  const serverResponse = useFetch(target);
  const serverResponse2 = useFetch(target2);
  const history = useHistory();

  // Check server response
  useEffect(() => {
    if (serverResponse.error.error) {
      setCurrentStatus(serverResponse.error.msg);
    }
    else if (serverResponse.data) {
      if (!serverResponse.data.result) {
        setCurrentStatus(serverResponse.data.err);
      }
      else {
        setCurrentStatus("");
        setUserInfo({
          username: serverResponse.data.userInfo.name,
          email: serverResponse.data.userInfo.email,
          avatar: serverResponse.data.userInfo.avatar
        });
      }
    }
  }, [serverResponse.error, serverResponse.data])


  // Check server response
  useEffect(() => {
    if (serverResponse2.error.error) {
      setCurrentStatus(serverResponse2.error.msg);
    }
    else if (serverResponse2.data) {
      if (!serverResponse2.data.result) {
        setCurrentStatus(serverResponse2.data.err);
      }
      else {
        setCurrentStatus("");
        setTransctionTable(generateTransactionTable(serverResponse2.data.trans, classes));
      }
    }
  }, [serverResponse2.error, serverResponse2.data])

  return (
    <Container className={classes.container}>
      {/* heading */}
      <Container className={classes.avatarContainer}>
        <Avatar
          className={classes.avatar}
          alt={userInfo.username}
          src={userInfo.avatar}
        />
        <Typography>{userInfo.userName}</Typography>
      </Container>
      {/* Username */}
      <TextField className={classes.field}
        value={userInfo.username}
        label="Username" 
        variant="outlined" 
        color="secondary" 
        fullWidth
        required
        disabled
      />

      {/* Email */}
      <TextField className={classes.field}
        value={userInfo.email}
        label="Email" 
        variant="outlined" 
        color="secondary" 
        fullWidth
        required
        disabled
      />

      {/* Preview Img avatar */}
      <TextField className={classes.field}
        value={userInfo.avatar}
        label="Avatar Image (Link)" 
        variant="outlined" 
        color="secondary" 
        fullWidth
        disabled
      />

      <Button
        className={classes.button}
        variant="contained"
        color="secondary"
        onClick={() => history.push("/edituser/" + userName)}
      >
        EDIT
      </Button>
      <br/>
      <br/>
      <br/>
      <Typography variant="h4">
        Transactions
      </Typography>
      {transctionTable}

      <Typography variant="button" color="error">
        {currentStatus}
      </Typography>
    </Container>
  );
}

export default UserInfo
