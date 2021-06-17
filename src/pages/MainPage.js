import { makeStyles } from '@material-ui/core'
import CoinTable from '../components/CoinTable';
import UserTable from '../components/UserTable';
import {getCachedValueIfNull} from '../components/Utility';
import useServerResponse from '../components/hooks/useServerResponse';

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
  const pricingData = useServerResponse('coin.php', {type: "prices" , firstFetch: true}, 'coins');

  // const [timeoutCounter, setTimeoutCounter] = useState(0);

  // useEffect(() => {
  //   const timer = setTimeout(() => {
  //     setTarget({uri:  `${serverAddress}/coin.php`, data: {type: "prices"}})
  //     setTimeoutCounter(timeoutCounter + 1);
  //   }, 3000);
  //   return () => clearTimeout(timer);
  // }, [timeoutCounter]);


  const data = getCachedValueIfNull("pricingData", pricingData, []);
  return (
    <div className={classes.root}>
      <CoinTable pricingData={data}/>
      <UserTable pricingData={data}/>
    </div>
  );
}

export default MainPage
