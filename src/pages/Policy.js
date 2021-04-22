import Typography from '@material-ui/core/Typography';
import Divider from '@material-ui/core/Divider';
import Paper from '@material-ui/core/Paper';
import { makeStyles } from '@material-ui/core/styles';
import {Link} from "react-router-dom";

const useStyles = makeStyles((theme) => ({
  root: {
    marginTop: 150,
    width: '90%',
    maxWidth: 800,
    display: 'block',
    marginLeft: 'auto',
    marginRight: 'auto',
    padding: 20
  },
  heading: {
    textAlign: 'center',
    marginBottom: 25
  },
  line: {
    marginTop: 20
  }
}));


const Policy = () => {
  const classes = useStyles();
  return (
    <Paper className={classes.root}>
      <Typography variant='h4' className={classes.heading}>
        POLICY
      </Typography>

      <Typography className={classes.line}>
        Purchasing and trading of cryoptocurrencies and altcoins should be thoroughly 
        conversed in the trading associated whatsapp group namely cucek trading.
      </Typography>
      <Divider/>
      <Typography className={classes.line}>
        The individuals are kindly requested to confirm their deposit amount and 
        collection fee associated with the wallet app in the provided trading website.
      </Typography>
      <Divider/>
      <Typography className={classes.line}>
        Dept associated with an individual is solely responsible to that individual.
        Further allegations against the maintenance team or trading admins wont be accepted.
      </Typography>
      <Divider/>
      <Typography className={classes.line}>
        Individuals must be conscious about the delay in depositing time and must keep track 
        of decline or surge accosiated with their cryptocurrencies.
      </Typography>
    </Paper>
  );
}

export default Policy
