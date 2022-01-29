import {Avatar, Paper} from '@mui/material';
import React, {useEffect, useState} from 'react';
import {useStore} from '../../../store';
import {Coin, Wallet} from '../../../types';

const UserWallet = ({coinId}: {coinId: string}) => {
  const users = useStore(state => state.users);
  const coins = useStore(state => state.coins);
  const cred = useStore(state => state.userCred);
  const [wallet, setWallet] = useState<Wallet>();
  const [coin, setCoin] = useState<Coin>();

  useEffect(() => {
    if (cred && users) {
      for (const i of users) {
        if (i.email === cred.email) {
          setWallet(i.wallet);
          break;
        }
      }
    }
  }, [cred, users]);

  useEffect(() => {
    if (coins && coinId) {
      for (const i of coins) {
        if (i.id === coinId) {
          setCoin(i);
          break;
        }
      }
    }
  }, [coinId, coins]);

  let count = wallet && wallet.coins && wallet.coins[coinId];
  count = count ? count : 0;
  const balance = wallet && wallet.balance.toFixed(2);

  return (
    <Paper sx={{padding: 2}}>
      <Avatar
        src={coin && coin.avatar}
        alt={coin && coin.id}
        sx={{margin: 'auto', width: 80, height: 80}}
      />
      <p style={{textAlign: 'center'}}>{count}</p>
      <p>Balance : {balance}</p>
    </Paper>
  );
};

export default UserWallet;
