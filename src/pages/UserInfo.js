import {useParams} from "react-router";
import Container from '@material-ui/core/Container'
import { makeStyles } from '@material-ui/core'
import Chart from "react-google-charts";
import UserDetails from "../components/UserDetails";
import UserWalletTable from "../components/UserWalletTable";
import UserCoinsTable from "../components/UserCoinsTable";
import useServerResponse from "../components/hooks/useServerResponse";
import UserTransactionTable from "../components/UserTransactionTable";
import UserFundTransferTable from "../components/UserFundTransferTable";

const useStyles = makeStyles({
  tableContainer: {
    marginTop: 40,
  },

  container: {
    marginTop: 50,
    margin: 'auto',
    width: '90%',
    maxWidth: 1200
  },

  pieChart: {
    marginLeft: 'auto',
    marginRight: 'auto',
  }
})

function genPieChart(coinData, classes) {
  let data = [];
  data.push(['coin', 'investment']);
  for (let i of coinData) {
    data.push([i.coinInfo.name, parseFloat(i.investment) ]);
  }
  console.log(data);
  return (
    <Chart
      height={350}
      className={classes.pieChart}
      chartType="PieChart"
      loader={<div>Loading Chart</div>}
      data={
        data
      }
      options={{
        title: 'Investments',
        is3D: true,
      }}
      rootProps={{ 'data-testid': '2' }}
    />
  ); 
}


const UserInfo = () => {
  const {userName} = useParams();
  const classes = useStyles()

  const pricingData = useServerResponse('coin.php', {type: "prices" , firstFetch: true}, 'coins');
  const transctionData = useServerResponse('transction.php', {type: 'list', username: userName}, 'trans');

  return (
    <Container className={classes.container}>
      <UserDetails username={userName}/>
      <UserWalletTable username={userName}/>
      <UserCoinsTable username={userName} coinPricing={pricingData} transctionHistory={transctionData}/>
      <UserTransactionTable transctionData={transctionData}/>
      <UserFundTransferTable username={userName}/>
    </Container>
  );
}

export default UserInfo
