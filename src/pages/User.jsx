import React, {Fragment} from 'react';
import {useParams} from 'react-router-dom';
import Avatar from '@mui/material/Avatar';

import Typography from '@mui/material/Typography';
import {useStore} from '../store';
import CircularProgress from '@mui/material/CircularProgress';
import Paper from '@mui/material/Paper';
import UserCoins from '../components/user/UserCoins';

const getUser = (username, users) => {
  let user = null;
  if (username && users) {
    users.forEach(item => {
      if (item.name === username) {
        user = item;
      }
    });
  }
  return user;
};

const User = () => {
  const {username} = useParams();
  const users = useStore(state => state.users);
  const user = getUser(username, users);
  return (
    <div style={{width: 'max-content', margin: 'auto', marginTop: 80}}>
      <Paper sx={{paddingTop: 10}}>
        {user ? (
          <Fragment>
            <Avatar
              src={user.avatar}
              alt={user.name}
              sx={{width: 128, height: 128, margin: 'auto'}}
            />
            <Typography sx={{textAlign: 'center'}}>{user.name}</Typography>
            <UserCoins user={user} />
          </Fragment>
        ) : (
          <CircularProgress />
        )}
      </Paper>
    </div>
  );
};

export default User;
