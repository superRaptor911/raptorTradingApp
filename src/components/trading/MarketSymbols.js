import React, {memo, useEffect , useMemo, useRef, useState} from "react";
import Typography from '@material-ui/core/Typography';
import {getSessionStorage, serverAddress, setSessionStorage} from "../Utility";
import useFetch from "../useFetch";
import { FixedSizeList } from 'react-window';
import ListItem from '@material-ui/core/ListItem';
import ListItemText from '@material-ui/core/ListItemText';
import Divider from '@material-ui/core/Divider';
import AutoSizer from "react-virtualized-auto-sizer";

function genList(data) {
  return (
    data && data.slice(0, 10).map((item, id) => (
      <ListItem button key={id}>
        <ListItemText primary={item.symbol}/>
      </ListItem>
    ))
  );
}

const MarketSymbols = ({setSelectedSymbol}) => {
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

  const list = (symbolList == null) ? getSessionStorage("tradingSymbolList") : symbolList;

  const renderRow = ({index, style}) => {
   return (
     <ListItem button style={style} key={index} onClick={() => {setSelectedSymbol(list[index].symbol)}}>
      <ListItemText primary={list[index].symbol} />
    </ListItem>
  ); 
  }

  console.log("Rendering List")
  return (
    <div>
      <FixedSizeList height={600} width={300} itemSize={46} itemCount={list.length}>
        {renderRow}
      </FixedSizeList>
    </div>
  );
}

export default memo(MarketSymbols)
