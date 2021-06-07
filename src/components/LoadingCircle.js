import { makeStyles } from '@material-ui/core/styles';
import CircularProgress from '@material-ui/core/CircularProgress';

const useStyles = makeStyles({
  root: {
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'center'
  },
});

const LoadingCircle = () => {
  const classes = useStyles();

  return (
    <div className={classes.root}>
      <CircularProgress/>
    </div>
  );
}

export default LoadingCircle
