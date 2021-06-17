import Typography from '@material-ui/core/Typography';
import { makeStyles } from '@material-ui/core'
import TextField from '@material-ui/core/TextField'
import Avatar from '@material-ui/core/Avatar';
import useServerResponse from './hooks/useServerResponse';
import LoadingCircle from './LoadingCircle';

const useStyles = makeStyles({
  root: {
    marginTop: 40,
  },
  field: {
    marginTop: 20,
    marginBottom: 20,
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

  avatar: {
    margin: 'auto',
    width: 80,
    height: 80
  },
})

const UserDetails = ({username}) => {
  const classes = useStyles()
  const userInfo = useServerResponse('users.php', {type: 'info', name: username}, 'userInfo');

  if (userInfo) {
    return (
      <div className={classes.root}>
        {/* heading */}
        <div className={classes.avatarContainer}>
          <Avatar
            className={classes.avatar}
            alt={username}
            src={userInfo.avatar}
          />
          <Typography>{username}</Typography>
        </div>

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
      </div>
    );
  }

  return (
    <LoadingCircle/>
  );
}

export default UserDetails
