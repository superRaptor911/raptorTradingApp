import React, {memo, useEffect , useMemo, useRef, useState} from "react";
import Typography from '@material-ui/core/Typography';
import {getCachedValueIfNull, getSessionStorage, readableValue, serverAddress, setSessionStorage} from "../Utility";
import useFetch from "../useFetch";
import { FixedSizeList } from 'react-window';
import ListItem from '@material-ui/core/ListItem';
import ListItemText from '@material-ui/core/ListItemText';
import AutoSizer from "react-virtualized-auto-sizer";
import Paper from '@material-ui/core/Paper';


const MarketSymbols = ({setSelectedSymbol, width, height}) => {
  const [target, setTarget] = useState({uri: `${serverAddress}/trading/market.php`, data: { type: 'ticker'}});
  const serverResponse = useFetch(target);

  const [symbolList, setSymbolList] = useState();

  // Get coins
  useEffect(() => {
    if (serverResponse.error.error) {
      // Fetch request failed
    }
    else if (serverResponse.data) {
      if (serverResponse.data.result) {
        setSymbolList(serverResponse.data.coins);
        setSessionStorage("tradingSymbolList", serverResponse.data.coins);
      }
      else {
        // Error from server
      }
    }
  }, [serverResponse.error, serverResponse.data]);


  const list = getCachedValueIfNull("tradingSymbolList", symbolList, []);
  const renderRow = ({index, style}) => {
   return (
     <ListItem button style={style} key={index} onClick={() => {setSelectedSymbol(list[index].symbol)}}>
      <ListItemText primary={list[index].symbol} />
       {"$" + readableValue(list[index].price)}
    </ListItem>
  ); 
  }

  console.log("Rendering List")
  return (
    <Paper>
      <FixedSizeList height={height} width={Math.max(width, 200)} itemSize={46} itemCount={list.length}>
        {renderRow}
      </FixedSizeList>
    </Paper>
  );
}

export default memo(MarketSymbols)
