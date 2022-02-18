import React, {Fragment, useEffect, useState} from 'react';
import {useParams} from 'react-router-dom';
import Avatar from '@mui/material/Avatar';

import Typography from '@mui/material/Typography';
import {useStore} from '../store';
import CircularProgress from '@mui/material/CircularProgress';
import Paper from '@mui/material/Paper';
import UserCoins from '../components/user/UserCoins';
import UserStats from '../components/user/UserStats';
import UserTransaction from '../components/user/UserTransactions';
import UserFundTransferList from '../components/user/UserFundTransfers';
import {getUser} from '../components/helper';
import {Transaction, User} from '../types';
import UserTradesGraph from '../components/user/UserTradesGraph';
import UserCoinNetWorthGraph from '../components/user/UserCoinNetWorthGraph';

const UserPage = () => {
  const {username}: {username: string} = useParams();
  const users = useStore(state => state.users);
  const loadUsers = useStore(state => state.loadUsers);

  const transactions = useStore(state => state.transactions);
  const loadTransactions = useStore(state => state.loadTransactions);

  const [userTransactions, setUserTransactions] = useState<Transaction[]>([]);
  const [user, setUser] = useState<User | null>(null);

  useEffect(() => {
    loadTransactions();
    loadUsers();
  }, []);

  useEffect(() => {
    setUser(getUser(username, users));
  }, [users, username]);

  useEffect(() => {
    if (transactions) {
      const list = transactions.filter(item => item.username == username);
      setUserTransactions(list);
    }
  }, [transactions, username]);

  return (
    <div
      style={{
        width: 'max-content',
        margin: 'auto',
        marginTop: 80,
        maxWidth: '100vw',
      }}>
      <Paper sx={{paddingTop: 10, maxWidth: '95vw', margin: 'auto'}}>
        {user ? (
          <Fragment>
            <Avatar
              src={user.avatar}
              alt={user.name}
              sx={{width: 128, height: 128, margin: 'auto'}}
            />
            <Typography sx={{textAlign: 'center'}}>{user.name}</Typography>

            <UserStats user={user} />
            <UserCoins user={user} transactions={userTransactions} />

            <UserTransaction user={user} allTransactions={userTransactions} />
            <UserFundTransferList user={user} />
            <UserCoinNetWorthGraph user={user} />
            <UserTradesGraph userTransactions={userTransactions} />
          </Fragment>
        ) : (
          <CircularProgress />
        )}
      </Paper>
    </div>
  );
};

export default UserPage;
