import { makeStyles } from '@material-ui/core/styles';
import {useEffect, useRef, useState} from 'react';
import CoinTransaction from '../../components/trading/CoinTransaction';
import MarketSymbols from '../../components/trading/MarketSymbols';
import SymbolHistory from '../../components/trading/SymbolHistory';

const useStyles = makeStyles({
  root: {
    display: 'flex',
  },

  rootMobile: {
    display: 'flex',
    flexDirection: 'column',
    overflowX: 'auto',
  },
  title: {
  },
  active: {
  }
});

const Market = () => {
  const classes = useStyles();
  const [selectedSymbol, setSelectedSymbol] = useState("");
  const divRef = useRef();

  const [width, setWidth] = useState(1200);
  const [height, setHeight] = useState(720);

  useEffect(() => {
    setWidth(divRef.current.offsetWidth); 
    setHeight(divRef.current.offsetHeight);

    console.log("height", divRef.current.offsetHeight)
    console.log("width", divRef.current.offsetWidth)
  }, []);


  // For Mobile Devices
  if (width < 600) {
    return (
      <div className={classes.rootMobile} ref={divRef}>
        <SymbolHistory symbol={selectedSymbol} width={width} height={height * 0.6}/>
        <MarketSymbols setSelectedSymbol={setSelectedSymbol} width={width} height={height * 0.4}/>
      </div>
    );
  }
  // For Desktop
  return (
    <div className={classes.root} ref={divRef}>
      <MarketSymbols setSelectedSymbol={setSelectedSymbol} width={width * 0.2} height={height}/>
      <SymbolHistory symbol={selectedSymbol} width={width * 0.5} height={height}/>
      <CoinTransaction symbol={selectedSymbol}/>
    </div>
  );
}

export default Market
