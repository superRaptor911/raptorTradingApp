import React from 'react';
import CoinList from '../components/CoinList';
import UserList from '../components/UserList';

function Home() {
  return (
    <div style={{overflowX: 'auto'}}>
      <CoinList />
      <UserList />
    </div>
  );
}

export default Home;
