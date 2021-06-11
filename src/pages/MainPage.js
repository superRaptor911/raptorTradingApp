import { makeStyles } from '@material-ui/core'
import TransactionTable from "../components/TransactionTable";
import CoinTable from '../components/CoinTable';
import UserTable from '../components/UserTable';
import {useEffect, useState} from 'react';
import {serverAddress} from '../components/Utility';
import useFetch from '../components/useFetch';

const useStyles = makeStyles({
  root: {
    marginTop: 50,
    width: '90%',
    display: 'block',
    marginLeft: 'auto',
    marginRight: 'auto',
  }
})

const MainPage = () => {
  const classes = useStyles();
  const [target, setTarget ] = useState({uri:  `${serverAddress}/coin.php`, data: {type: "prices" , firstFetch: true}});
  const serverResponse = useFetch(target);
  const [pricingData , setPricingData ] = useState([]);

  const [timeoutCounter, setTimeoutCounter] = useState(0);

  useEffect(() => {
    const timer = setTimeout(() => {
      setTarget({uri:  `${serverAddress}/coin.php`, data: {type: "prices"}})
      setTimeoutCounter(timeoutCounter + 1);
    }, 3000);
    return () => clearTimeout(timer);
  }, [timeoutCounter]);

  // Update profit/Loss
  useEffect(() => {
    if (serverResponse.error.error) {
      console.log("Error::CoinTable::" + serverResponse.error.msg);
    }
    else if (serverResponse.data) {
      if (serverResponse.data.result) {
        setPricingData(serverResponse.data.coins);
        console.log("Data type : " + serverResponse.data.type);
      }
      else {
        console.log("Error::CoinTable::" + serverResponse.data.err);
      }
    }
  }, [serverResponse.error, serverResponse.data]);

  console.log("Rendering main")
  return (
    <div className={classes.root}>
      <CoinTable pricingData={pricingData}/>
      <UserTable pricingData={pricingData}/>
    </div>
  );
}

export default MainPage
