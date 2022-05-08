import {Typography} from '@mui/material';
import CoinList from '../components/CoinList';
import UserList from '../components/UserList';

function Home() {
  return (
    <div style={{overflowX: 'auto'}}>
      <Typography
        variant="h4"
        style={{
          fontStyle: 'normal',
          fontWeight: '700',
          fontSize: '30px',
          lineHeight: '22px',
          letterSpacing: '0.2px',
          color: '#000000',
          textShadow: '0px 4px 4px rgba(0, 0, 0, 0.25)',

          width: '90vw',
          maxWidth: 1000,
          margin: 'auto',
          marginTop: 30,
        }}>
        Market
      </Typography>
      <CoinList />

      <Typography
        variant="h4"
        style={{
          fontStyle: 'normal',
          fontWeight: '700',
          fontSize: '30px',
          lineHeight: '22px',
          letterSpacing: '0.2px',
          color: '#000000',
          textShadow: '0px 4px 4px rgba(0, 0, 0, 0.25)',

          width: '90vw',
          maxWidth: 1000,
          margin: 'auto',
          marginTop: 40,
        }}>
        User Base
      </Typography>
      <UserList />
    </div>
  );
}

export default Home;
