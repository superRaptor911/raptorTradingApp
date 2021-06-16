import {useEffect , useState} from "react";
import {useHistory} from "react-router";
import useFetch from "../components/hooks/useFetch";
import {serverAddress} from '../components/Utility';
import Typography from '@material-ui/core/Typography';
import { makeStyles } from '@material-ui/core'
import Grid from '@material-ui/core/Grid'
import {Link} from "react-router-dom";
import UserCard from "../components/UserCard";

const useStyles = makeStyles({
  root: {
    marginTop: 100,
    margin: 'auto',
    width: '90%',
    maxWidth: 800,
    textDecoration: 'none'
  },

})

function generateGridItems(userList) {
  let userListJsx = [];
  for (const user of userList) {
    let userJsx = (
      <Grid item xs={12} md={6} lg={4} key={user.name}>
        <Link to={`/user/${user.name}`}>
          <UserCard
            username={user.name}
            image={user.avatar}
          />
        </Link>
      </Grid>
    );
    userListJsx.push(userJsx);
  }
  return userListJsx;
}

const UserList = () => {
  const classes = useStyles()
  const [target, setTarget] = useState({uri: `${serverAddress}/users.php`, data: {type: 'list'}});
  const history = useHistory();

  // This variable is used to show status when submit button is pressed.
  const [currentStatus, setCurrentStatus] = useState("");
  const serverResponse = useFetch(target);
  const [userListJsx, setUserListJsx] = useState();

  // Check server response
  useEffect(() => {
    if (serverResponse.error.error) {
      setCurrentStatus(serverResponse.error.msg);
      console.log("error")
    }
    else if (serverResponse.data) {
      if (!serverResponse.data.result) {
        setCurrentStatus(serverResponse.data.err);
      }
      else {
        setCurrentStatus("");
        setUserListJsx(generateGridItems(serverResponse.data.users));
      }
    }
  }, [serverResponse.error, serverResponse.data])


  return (
    <div className={classes.root}>
      <Typography color="error">
        {currentStatus}
      </Typography>

      <Grid container spacing={3} >
        {userListJsx}
      </Grid>
    </div>
  );
}

export default UserList
