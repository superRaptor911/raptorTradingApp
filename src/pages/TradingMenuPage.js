import { makeStyles } from '@material-ui/core/styles';
import TabBar from '../components/trading/TabBar';
import LoginUser from './trading/LoginUser';

const useStyles = makeStyles({
  root: {
    marginTop: 100,
    width: "90%",
    maxWidth: 1000,
    display: 'block',
    marginLeft: 'auto',
    marginRight: 'auto'
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
    <div>
      <TabBar titles={["1", "2", "3"]}>
        <h1>GGWP</h1>
        <h1>GGWP 2</h1>
        <h1>GGWP 3</h1>
      </TabBar>
      <div className={classes.root}>
        <LoginUser/>
      </div>
    </div>
  );
}

export default TradingMenuPage
