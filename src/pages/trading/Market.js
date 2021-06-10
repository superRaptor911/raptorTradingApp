import { makeStyles } from '@material-ui/core/styles';
import {useState} from 'react';
import MarketSymbols from '../../components/trading/MarketSymbols';

const useStyles = makeStyles({
  root: {
    display: 'flex',
  },
  title: {
  },
  active: {
  }
});

const Market = () => {
  const classes = useStyles();
  const [selectedSymbol, setSelectedSymbol] = useState("");

  return (
    <div className={classes.root}>
      <MarketSymbols setSelectedSymbol={setSelectedSymbol}/>
    </div>
  );
}

export default Market
