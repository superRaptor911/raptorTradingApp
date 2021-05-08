import {useEffect , useRef, useState} from "react";
import {useHistory} from "react-router";
import useFetch from "../components/useFetch";
import {serverAddress, sortBy} from '../components/Utility';
import Container from '@material-ui/core/Container'
import Typography from '@material-ui/core/Typography';
import { makeStyles } from '@material-ui/core'
import Avatar from '@material-ui/core/Avatar';
import Table from '@material-ui/core/Table';
import TableBody from '@material-ui/core/TableBody';
import TableCell from '@material-ui/core/TableCell';
import TableContainer from '@material-ui/core/TableContainer';
import TableHead from '@material-ui/core/TableHead';
import TableRow from '@material-ui/core/TableRow';
import Paper from '@material-ui/core/Paper';
import {Link} from "react-router-dom";
import Chart from "react-google-charts";

const useStyles = makeStyles({
  root: {
    marginTop: 100,
    margin: 'auto',
    width: '90%',
    maxWidth: 1000
  },
  title : {
    textAlign: 'center',
  },
  papertext: {
    display: 'block',
    marginLeft: 'auto',
    marginRight: 'auto',
    marginTop: 20,
    padding: 15,
    backgroundColor: 'lightblue',
    width: 'max-content',
    paddingLeft: 20,
    paddingRight: 20,
  },
  pieChart: {
    marginLeft: 'auto',
    marginRight: 'auto',
  },

  item: {
    marginTop: 40,
  }

});

function genPortfolioValue(investmentData, coinPricing, classes) {
  let total = 0;
  let totalInvestment = 0;
  let inWallet = 0;

  if (investmentData) {
    for (let i of investmentData) {
      total += parseFloat(i.amount);
      totalInvestment += parseFloat(i.investment);
    }
  }
  
  inWallet = total;

  if (coinPricing && investmentData) {
    for (let user of investmentData) {
      for (let i of user.coins) {
        let coin = coinPricing[i.coin];
        if (coin) {
          let value = i.count * coin.last;
          total += value;
        }
      }
    }
  }

  total = total.toFixed(2);
  totalInvestment = totalInvestment.toFixed(2);
  inWallet = inWallet.toFixed(2);

  return (
    <Paper className={classes.papertext}>
      <Typography variant="h5">
        Estimated Portfolio : Rs {total}
      </Typography>
      <Typography variant="h5">
        Total investment: Rs {totalInvestment}
      </Typography>
      <Typography variant="h5">
        In Wallet: Rs {inWallet}
      </Typography>
    </Paper>
  );

}

function genCoinCountPieChart(coins, pricing, classes) {
  let data = [];

  if (coins && pricing) {
    for (let i in coins) {
      let count = coins[i];
      let coin = pricing[i];
      data.push([i, parseFloat(count) * coin.last]);
    }
  }

  data.sort(sortBy(1, "desc"));
  data.unshift(['Coins', 'investment']);
  return (
    <Chart
      height={'46vw'}
      className={classes.pieChart}
      chartType="PieChart"
      loader={<div>Loading Chart</div>}
      data={
        data
      }
      options={{
        title: 'Coin Investments',
        is3D: true,
      }}
      rootProps={{ 'data-testid': '2' }}
    />
  ); 
}

function genInvestorPieChart(investmentData, classes) {
  let data = [];
  let data2 = [];
  data.push(['Users', 'investment']);
  data2.push(['Users', 'wallet']);
  if (investmentData) {
    investmentData.sort(sortBy("investment", "desc"));
  }
  for (let i of investmentData) {
    data.push([i.username, parseFloat(i.investment) ]);
  }

  if (investmentData) {
    investmentData.sort(sortBy("amount", "desc"));
  }
  for (let i of investmentData) {
    data2.push([i.username, parseFloat(i.amount) ]);
  }
  return (
    <div>
      <Chart
        height={'46vw'}
        className={classes.pieChart}
        chartType="PieChart"
        loader={<div>Loading Chart</div>}
        data={
          data
        }
        options={{
          title: 'Investors',
          is3D: true,
        }}
        rootProps={{ 'data-testid': '2' }}
      />

      <Chart
        height={'46vw'}
        className={classes.pieChart}
        chartType="PieChart"
        loader={<div>Loading Chart</div>}
        data={
          data2
        }
        options={{
          title: 'In Wallet',
          is3D: true,
        }}
        rootProps={{ 'data-testid': '2' }}
      />
    </div>
  ); 
}

const Company = () => {
  const classes = useStyles();
  const [target, ] = useState({uri: `${serverAddress}/userCoins.php`, data: { type: 'count', }});
  const [target2, ] = useState({uri:  `${serverAddress}/coin.php`, data: {type: "prices"}});
  const [target3, ] = useState({uri:  `${serverAddress}/transction.php`, data: {type: "investmentNcoins"}});
  const [target4, ] = useState({uri:  `${serverAddress}/donations.php`, data: {type: "list"}});

  const serverResponse = useFetch(target);
  const serverResponse2 = useFetch(target2);
  const serverResponse3 = useFetch(target3);
  const serverResponse4 = useFetch(target4);

  const [currentStatus, setCurrentStatus] = useState("LOADING ...");
  const [currentStatus2, setCurrentStatus2] = useState("LOADING ...");
  const [currentStatus3, setCurrentStatus3] = useState("LOADING ...");
  const [currentStatus4, setCurrentStatus4] = useState("LOADING ...");

  const [portfolio, setPortfolio] = useState(genPortfolioValue(null, null, classes));
  const [investmentPieChart, setInvestmentPieChart] = useState();
  const [coinInvestmentPieChart, setCoinInvestmentPieChart] = useState();
  const [donationPieChart, setDonationPieChart] = useState();

  const coinCount = useRef();
  const coinPrices = useRef();
  const investments = useRef();

  // Get coins
  useEffect(() => {
    if (serverResponse.error.error) {
      // Fetch request failed
      setCurrentStatus(serverResponse.error.msg);
    }
    else if (serverResponse.data) {
      if (serverResponse.data.result) {
        setCurrentStatus("");
        coinCount.current = serverResponse.data.coins;
        setCoinInvestmentPieChart(genCoinCountPieChart(serverResponse.data.coins, coinPrices.current, classes));
      }
      else {
        // Error from server
        setCurrentStatus(serverResponse.error.err);
      }
    }
  }, [serverResponse.error, serverResponse.data]);

  // Get coins
  useEffect(() => {
    if (serverResponse2.error.error) {
      // Fetch request failed
      setCurrentStatus2(serverResponse2.error.msg);
    }
    else if (serverResponse2.data) {
      if (serverResponse2.data.result) {
        setCurrentStatus2("");
        coinPrices.current = serverResponse2.data.coins;
        setPortfolio(genPortfolioValue(investments.current, serverResponse2.data.coins, classes))
        setCoinInvestmentPieChart(genCoinCountPieChart(coinCount.current, serverResponse2.data.coins, classes));
      }
      else {
        // Error from server
        setCurrentStatus2(serverResponse2.error.err);
      }
    }
  }, [serverResponse2.error, serverResponse2.data]);

  // Get coins
  useEffect(() => {
    if (serverResponse3.error.error) {
      // Fetch request failed
      setCurrentStatus3(serverResponse3.error.msg);
    }
    else if (serverResponse3.data) {
      if (serverResponse3.data.result) {
        setCurrentStatus3("");
        investments.current = serverResponse3.data.data;
        setPortfolio(genPortfolioValue(serverResponse3.data.data, coinPrices.current, classes))
        setInvestmentPieChart(genInvestorPieChart(serverResponse3.data.data, classes));
      }
      else {
        // Error from server
        setCurrentStatus3(serverResponse3.error.err);
      }
    }
  }, [serverResponse3.error, serverResponse3.data]);

  // Get coins
  useEffect(() => {
    if (serverResponse4.error.error) {
      // Fetch request failed
      setCurrentStatus4(serverResponse4.error.msg);
    }
    else if (serverResponse4.data) {
      if (serverResponse4.data.result) {
        setCurrentStatus4("");
      }
      else {
        // Error from server
        setCurrentStatus4(serverResponse4.error.err);
      }
    }
  }, [serverResponse4.error, serverResponse4.data]);


  return (
    <div className={classes.root}>
      <Typography variant="h4" className={classes.title}>
        Raptor INC
      </Typography>

      {portfolio}

      <Typography variant="button" color="error">
        {currentStatus2}
      </Typography>

      <Typography variant="h4" className={classes.item}>
        Investments
      </Typography>
      {coinInvestmentPieChart}
      {investmentPieChart}

      <Typography variant="button" color="error">
        {currentStatus3}
      </Typography>
    </div>
  );
}

export default Company
