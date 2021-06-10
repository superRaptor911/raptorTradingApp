import { makeStyles } from '@material-ui/core/styles';
import TabBar from '../components/trading/TabBar';
import LoginUser from './trading/LoginUser';
import Market from './trading/Market';

const useStyles = makeStyles({
  root: {
  },
  title: {
    textAlign: 'center',
  },
  active: {
    background: '#f4f4f4'
  }
});


const TradingMenuPage = () => {
  const classes = useStyles();

  return (
    <div className={classes.root}>
      <TabBar titles={["Market", "History", "Wallet"]}>
        <Market/>
        <h1>GGWP 2</h1>
        <h1>GGWP 3</h1>
      </TabBar>
      {/* <div className={classes.root}> */}
      {/*   <LoginUser/> */}
      {/* </div> */}
    </div>
  );
}

export default TradingMenuPage
