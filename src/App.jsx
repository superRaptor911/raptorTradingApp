import React from 'react';
import CoinList from './components/CoinList';
import UserList from './components/UserList';

function App() {
  return (
    <div style={{width: '100vw'}}>
      <CoinList />
      <UserList />
    </div>
  );
}

export default App;
