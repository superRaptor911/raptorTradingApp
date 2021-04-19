import { makeStyles } from '@material-ui/core'
import TransactionTable from "../components/TransactionTable";
import CoinTable from '../components/CoinTable';

const useStyles = makeStyles({
  root: {
    marginTop: 120,
    width: '90%',
    display: 'block',
    marginLeft: 'auto',
    marginRight: 'auto',
  }
})

const MainPage = () => {
  const classes = useStyles();

  return (
    <div className={classes.root}>
      <CoinTable/>
      <br/>
      <br/>
      <br/>
      <TransactionTable/>
      <br/>
      <br/>
      <br/>
    </div>
  );
}

export default MainPage
