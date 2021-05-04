import {useEffect , useRef, useState} from "react";
import {useHistory, useParams} from "react-router";
import useFetch from "../components/useFetch";
import {serverAddress} from '../components/Utility';
import Container from '@material-ui/core/Container'
import Typography from '@material-ui/core/Typography';
import { makeStyles } from '@material-ui/core'
import TextField from '@material-ui/core/TextField'
import Button from '@material-ui/core/Button'
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
  field: {
    marginTop: 20,
    marginBottom: 20,
    display: 'block',
    marginLeft: 'auto',
    marginRight: 'auto',
  },
  tableContainer: {
    marginTop: 40,
  },

  container: {
    marginTop: 100,
    margin: 'auto',
    width: '90%',
    maxWidth: 1000
  },

  avatarContainer: {
    textAlign: 'center',
    width: 'min-content',
    margin: 'auto',
    marginTop: 10,
    marginBottom: 10
  },

  avatar: {
    margin: 'auto',
    width: 80,
    height: 80
  },

  button: {
    display: 'block',
    marginLeft: 'auto',
    marginRight: 'auto'
  },
  iconContainer: {
    display: 'flex',
    flexDirection: 'row',
    alignItems: 'center',
    flex: 1
  },
  icon: {
    width: 40,
    height: 40,
    marginRight: 10,
  },
  iconText: {
    fontSize: 18
  },
  red: {
    color: 'red',
    fontWeight: 'bold'
  },
  green: {
    color: 'green',
    fontWeight: 'bold'
  },
  pieChartContainer: {
        marginTop: 20,
  },
  pieChart: {
    marginLeft: 'auto',
    marginRight: 'auto',
  }
})


const generateTransactionTable = (data, classes) => {
  return (
    <TableContainer component={Paper}>
      <Table  aria-label="simple table">
        <TableHead>
          <TableRow>
            <TableCell>Name</TableCell>
            <TableCell >Coin Name</TableCell>
            <TableCell align="center">Coin Count</TableCell>
            <TableCell align="center">Coin Price (INR)</TableCell>
            <TableCell align="center">Total (INR)</TableCell>
            <TableCell align="center">Type</TableCell>
            <TableCell align="center">Edit?</TableCell>
          </TableRow>
        </TableHead>
        <TableBody>
          {data.map((row) => (
            <TableRow key={row.id}>
              <TableCell component="th" scope="row">
                <div className={classes.iconContainer}>
                  <Avatar
                    alt={row.username}
                    src={row.userAvatar}
                    className={classes.icon}
                  />
                  <Typography className={classes.iconText}>
                    {row.username}
                  </Typography>
                </div>
              </TableCell>

              <TableCell align="right">
                <div className={classes.iconContainer}>
                  <Avatar
                    alt={row.coin}
                    src={row.coinAvatar}
                    className={classes.icon}
                  />
                  <Typography className={classes.iconText}>
                    {row.coin}
                  </Typography>
                </div>
              </TableCell>
              <TableCell align="center">{row.coinCount}</TableCell>
              <TableCell align="center">{parseFloat(row.cost).toFixed(2)}</TableCell>
              <TableCell align="center">{(row.cost * row.coinCount).toFixed(2)}</TableCell>
              <TableCell align="center" className={(row.transType == 1) ? classes.green : classes.red}>
                {(row.transType == 1) ? "BUY" : "SELL"}
              </TableCell>
              <TableCell align="center"> <Button color="secondary">Edit</Button> </TableCell>
            </TableRow>
          ))}
        </TableBody>
      </Table>
    </TableContainer>
  );
}

const generateUserCoinsTable = (data, classes) => {
  return (
    <TableContainer component={Paper}>
      <Table  aria-label="simple table">
        <TableHead>
          <TableRow>
            <TableCell>Coin ID</TableCell>
            <TableCell align="center">Coin Count</TableCell>
            <TableCell align="center">Investment</TableCell>
            <TableCell align="center">Profit</TableCell>
            <TableCell align="center">Profit %</TableCell>
          </TableRow>
        </TableHead>
        <TableBody>
          {data.map((row) => (
            <TableRow key={row.id}>
              <TableCell component="th" scope="row">
                <Link to={"/coininfo/" + row.coin}>
                <div className={classes.iconContainer}>
                  <Avatar
                    alt={row.coinInfo.name}
                    src={row.coinInfo.avatar}
                    className={classes.icon}
                  />
                  <Typography className={classes.iconText}>
                    {row.coinInfo.name}
                  </Typography>
                </div>
                  </Link>
              </TableCell>
              <TableCell align="center">{row.count}</TableCell>
              <TableCell align="center">{row.investment}</TableCell>
              <TableCell align="center" className={(row.percent > 0) ? classes.green : classes.red}>{row.profit}</TableCell>
              <TableCell align="center" className={(row.percent > 0) ? classes.green : classes.red}>{row.percent}</TableCell>
            </TableRow>
          ))}
        </TableBody>
      </Table>
    </TableContainer>
  );
}


const generateUserWalletTable = (data) => {
  return (
    <TableContainer component={Paper}>
      <Table  aria-label="simple table">
        <TableHead>
          <TableRow>
            <TableCell>User</TableCell>
            <TableCell align="center">Wallet Balance(INR)</TableCell>
          </TableRow>
        </TableHead>
        <TableBody>
          <TableRow>
            <TableCell component="th" scope="row">{data.username}</TableCell>
            <TableCell align="center">{parseFloat(data.amount).toFixed(2)}</TableCell>
          </TableRow>
        </TableBody>
      </Table>
    </TableContainer>
  );
}

const generateFundTransferHistoryTable = (data, classes) => {
  return (
    <TableContainer component={Paper}>
      <Table  aria-label="simple table">
        <TableHead>
          <TableRow>
            <TableCell>Name</TableCell>
            <TableCell align="center">Amount</TableCell>
            <TableCell align="center">Fee</TableCell>
            <TableCell align="center">Type</TableCell>
            <TableCell align="center">Time</TableCell>
          </TableRow>
        </TableHead>
        <TableBody>
          {data.map((row) => (
            <TableRow key={row.time}>
              <TableCell component="th" scope="row">
                <div className={classes.iconContainer}>
                  <Avatar
                    alt={row.username}
                    src={row.userAvatar}
                    className={classes.icon}
                  />
                  <Typography className={classes.iconText}>
                    {row.username}
                  </Typography>
                </div>
              </TableCell>
              <TableCell align="center">{parseFloat(row.amount).toFixed(2)}</TableCell>
              <TableCell align="center">{parseFloat(row.fee).toFixed(2)}</TableCell>
              <TableCell align="center" className={(row.transType == 1) ? classes.green : classes.red}>
                {(row.transType == 1) ? "DEPOSIT" : "WITHDRAW"}
              </TableCell>
              <TableCell align="center">{row.time}</TableCell>
            </TableRow>
          ))}
        </TableBody>
      </Table>
    </TableContainer>
  );
}


function computeProfit(coinName, coinId, transctionHistory, pricing) {
  let investment = 0;
  let coinCount = 0;
  let profit = 0;
  let percent = 0;

  if (pricing) {
    for (let i of transctionHistory) {
      if (i.coin === coinName) {
        if (i.transType == 1) {
          investment += i.cost * i.coinCount + parseFloat(i.fee);
          coinCount += parseFloat(i.coinCount);
        }
        else {
          investment -= i.cost * i.coinCount;
          investment += parseFloat(i.fee);
          coinCount -= parseFloat(i.coinCount);
        }
      }
    }


    investment = Math.max(investment, 0);
    let coin = pricing[coinId];
    if (coin) {
      profit = coin.last * coinCount - investment;
      percent = profit / investment * 100;
    }
  }
  return {investment: investment.toFixed(2),profit: profit.toFixed(2), percent: percent.toFixed(2)};
}

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

  const [userInfo, setUserInfo] = useState({
    username: "",
    email: "",
    avatar: ""
  });

  const [target, ] = useState({uri: `${serverAddress}/users.php`, data: {
    type: 'info',
    name: userName,
  }});

  const [target2, ] = useState({uri: `${serverAddress}/transction.php`, data: {
    type: 'info',
    username: userName,
  }});

  const [target3, ] = useState({uri: `${serverAddress}/userCoins.php`, data: {
    type: 'info',
    name: userName,
  }});

  const [target4, ] = useState({uri: `${serverAddress}/transction.php`, data: {
    type: 'walletInfo',
    username: userName,
  }});

  const [target5, ] = useState({uri: `${serverAddress}/transction.php`, data: {
    type: 'fundTransferHistory',
    username: userName,
  }});

  const [target6, ] = useState({uri:  `${serverAddress}/coin.php`, data: {
    type: "prices"
  }});

  // This variable is used to show status when submit button is pressed.
  const [currentStatus, setCurrentStatus] = useState("LOADING ...");
  const [currentStatus2, setCurrentStatus2] = useState("LOADING ...");
  const [currentStatus3, setCurrentStatus3] = useState("LOADING ...");
  const [currentStatus4, setCurrentStatus4] = useState("LOADING ...");
  const [currentStatus5, setCurrentStatus5] = useState("LOADING ...");
  const [transctionTable, setTransctionTable] = useState();
  const [userCoinsTable, setUserCoinsTable] = useState();
  const [userWalletTable, setUserWalletTable] = useState();
  const [pieChart, setPieChart] = useState();
  const [fundTransferHistoryTable, setFundTransferHistoryTable] = useState();

  const serverResponse = useFetch(target);
  const serverResponse2 = useFetch(target2);
  const serverResponse3 = useFetch(target3);
  const serverResponse4 = useFetch(target4);
  const serverResponse5 = useFetch(target5);
  const serverResponse6 = useFetch(target6);

  const transctionHistory = useRef(null);
  const userCoins = useRef(null);
  const coinPricing = useRef(null);
  const history = useHistory();

  // Check server response
  useEffect(() => {
    if (serverResponse.error.error) {
      setCurrentStatus(serverResponse.error.msg);
    }
    else if (serverResponse.data) {
      if (!serverResponse.data.result) {
        setCurrentStatus(serverResponse.data.err);
      }
      else {
        setCurrentStatus("");
        setUserInfo({
          username: serverResponse.data.userInfo.name,
          email: serverResponse.data.userInfo.email,
          avatar: serverResponse.data.userInfo.avatar
        });
      }
    }
  }, [serverResponse.error, serverResponse.data])


  // Check server response
  useEffect(() => {
    if (serverResponse2.error.error) {
      setCurrentStatus2(serverResponse2.error.msg);
    }
    else if (serverResponse2.data) {
      if (!serverResponse2.data.result) {
        setCurrentStatus2(serverResponse2.data.err);
      }
      else {
        setCurrentStatus2("");
        setTransctionTable(generateTransactionTable(serverResponse2.data.trans, classes));
        transctionHistory.current = serverResponse2.data.trans;
      }
    }
  }, [serverResponse2.error, serverResponse2.data])


  // Check server response
  useEffect(() => {
    if (serverResponse3.error.error) {
      setCurrentStatus3(serverResponse3.error.msg);
    }
    else if (serverResponse3.data) {
      if (!serverResponse3.data.result) {
        setCurrentStatus3(serverResponse3.data.err);
      }
      else {
        setCurrentStatus3("");
        setUserCoinsTable(generateUserCoinsTable(serverResponse3.data.userCoins, classes));
        userCoins.current = serverResponse3.data.userCoins;
      }
    }
  }, [serverResponse3.error, serverResponse3.data])


  // Check server response
  useEffect(() => {
    if (serverResponse4.error.error) {
      setCurrentStatus4(serverResponse4.error.msg);
    }
    else if (serverResponse4.data) {
      if (!serverResponse4.data.result) {
        setCurrentStatus4(serverResponse4.data.err);
      }
      else {
        setCurrentStatus4("");
        setUserWalletTable(generateUserWalletTable(serverResponse4.data.wallet));
      }
    }
  }, [serverResponse4.error, serverResponse4.data])


  // Check server response
  useEffect(() => {
    if (serverResponse5.error.error) {
      setCurrentStatus5(serverResponse5.error.msg);
    }
    else if (serverResponse5.data) {
      if (!serverResponse5.data.result) {
        setCurrentStatus5(serverResponse5.data.err);
      }
      else {
        setCurrentStatus5("");
        setFundTransferHistoryTable(generateFundTransferHistoryTable(serverResponse5.data.history, classes));
      }
    }
  }, [serverResponse5.error, serverResponse5.data])


  // Check server response
  useEffect(() => {
    if (serverResponse6.error.error) {
    }
    else if (serverResponse6.data) {
      if (!serverResponse6.data.result) {
      }
      else {
        let newUserCoins = [];
        for (let i of userCoins.current) {
          let profitDict = computeProfit(i.coinInfo.name, i.coin, transctionHistory.current, serverResponse6.data.coins);
          i.profit = profitDict.profit;
          i.percent = profitDict.percent;
          i.investment = profitDict.investment;
          newUserCoins.push(i);
        }
        setUserCoinsTable(generateUserCoinsTable(newUserCoins , classes));
        setPieChart(genPieChart(newUserCoins, classes));
        coinPricing.current = serverResponse6.data.coins;
      }
    }
  }, [serverResponse6.error, serverResponse6.data])


  return (
    <Container className={classes.container}>
      {/* heading */}
      <Container className={classes.avatarContainer}>
        <Avatar
          className={classes.avatar}
          alt={userInfo.username}
          src={userInfo.avatar}
        />
        <Typography>{userInfo.userName}</Typography>
      </Container>
      {/* Username */}
      <TextField className={classes.field}
        value={userInfo.username}
        label="Username" 
        variant="outlined" 
        color="secondary" 
        fullWidth
        required
        disabled
      />

      {/* Email */}
      <TextField className={classes.field}
        value={userInfo.email}
        label="Email" 
        variant="outlined" 
        color="secondary" 
        fullWidth
        required
        disabled
      />

      {/* Preview Img avatar */}
      <TextField className={classes.field}
        value={userInfo.avatar}
        label="Avatar Image (Link)" 
        variant="outlined" 
        color="secondary" 
        fullWidth
        disabled
      />

      <Button
        className={classes.button}
        variant="contained"
        color="secondary"
        onClick={() => history.push("/edituser/" + userName)}
      >
        EDIT
      </Button>

      <Typography variant="button" color="error">
        {currentStatus}
      </Typography>

      <div className={classes.tableContainer}>
        <Typography variant="h4">
          Wallet
        </Typography>
        <Typography variant="button" color="error">
          {currentStatus4}
        </Typography>
        {userWalletTable}
      </div>

      <div className={classes.tableContainer}>
        <Typography variant="h4">
          Investment Breakdown
        </Typography>
        {pieChart}
      </div>

      <div className={classes.tableContainer}>
        <Typography variant="h4">
          Coins
        </Typography>
        <Typography variant="button" color="error">
          {currentStatus3}
        </Typography>
        {userCoinsTable}
      </div>

      <div className={classes.tableContainer}>
        <Typography variant="h4">
          Coin Transactions
        </Typography>
        <Typography variant="button" color="error">
          {currentStatus2}
        </Typography>
        {transctionTable}
      </div>

      <div className={classes.tableContainer}>
        <Typography variant="h4">
          Fund Transfer History
        </Typography>
        <Typography variant="button" color="error">
          {currentStatus5}
        </Typography>
        {fundTransferHistoryTable}
      </div>

      <br/>
      <br/>
    </Container>
  );
}

export default UserInfo
