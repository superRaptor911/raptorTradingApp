import { makeStyles } from '@material-ui/core'
import TransactionTable from "../components/TransactionTable";

const useStyles = makeStyles({
  root: {
    marginTop: 120,
    width: '90%',
    display: 'block',
    marginLeft: 'auto',
    marginRight: 'auto',
  }
})

const TransactionHistory = () => {
  const classes = useStyles();

  return (
    <div className={classes.root}>
      <TransactionTable/>
      <br/>
      <br/>
      <br/>
    </div>
  );
}

export default TransactionHistory
