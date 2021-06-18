import { makeStyles } from '@material-ui/core'
import CoinTable from '../components/CoinTable';
import UserTable from '../components/UserTable';
import {getCachedValueIfNull} from '../components/Utility';
import useCoinPriceData from '../components/hooks/useCoinPriceData';

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
  const pricingData = useCoinPriceData();

  console.log("rendering main")

  const data = getCachedValueIfNull("pricingData", pricingData, []);
  return (
    <div className={classes.root}>
      <CoinTable pricingData={data}/>
      <UserTable pricingData={data}/>
    </div>
  );
}

export default MainPage
