import Paper from '@material-ui/core/Paper';
import Typography from '@material-ui/core/Typography';
import { makeStyles } from '@material-ui/core/styles';

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
    <div className={classes.root}>
    <Paper>
      <Typography variant="h4" className={classes.title}>
        Coming Soon
      </Typography>
    </Paper>
    </div>
  );
}

export default TradingMenuPage
