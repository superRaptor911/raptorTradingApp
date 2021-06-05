import './index.css';
import { createMuiTheme, ThemeProvider  } from '@material-ui/core/styles';
import {BrowserRouter as Router, Route, Switch} from 'react-router-dom'; 
import MainPage from './pages/MainPage';
import CssBaseline from "@material-ui/core/CssBaseline";
import Paper from '@material-ui/core/Paper';
import Login from './pages/Login';
import Header from './components/Header';
import AdminMenu from './pages/AdminMenu';
import AddUser from './pages/AddUser';
import AddCoin from './pages/AddCoin';
import AddTransaction from './pages/AddTransaction';
import EditUser from './pages/EditUser';
import UserList from './pages/UserList';
import UserInfo from './pages/UserInfo';
import AdminLogin from './pages/AdminLogin';
import EditTransactionMenu from './pages/EditTransactionMenu';
import TransferFund from './pages/TransferFund';
import Policy from './pages/Policy';
import TransactionHistory from './pages/TransactionHistory';
import CoinInfo from './pages/CoinInfo';
import Company from './pages/Company';
import DatabaseQuery from './pages/DatabaseQuery';
import {useState} from 'react';

const createTheme = (darkMode) => {
  return createMuiTheme({
    "palette": {
      type: darkMode ? 'dark' : 'light',
      primary: {
        main: '#793fb5',
      },
      secondary: {
        main: '#f50057',
      },
    }
  });

}

function App() {
  const [darkMode, setDarkMode] = useState(false);

  return (
    <Router>
      <ThemeProvider theme={createTheme(darkMode)}>
        <CssBaseline />
        <Header/>
        <div>
          <Switch>
            <Route exact path="/">
              <MainPage/>
            </Route>

            <Route exact path="/login">
              <Login/>
            </Route>

            <Route exact path="/adminmenu">
              <AdminMenu/>
            </Route>

            <Route exact path="/adduser">
              <AddUser/>
            </Route>

            <Route exact path="/addcoin">
              <AddCoin/>
            </Route>

            <Route exact path="/transferfund">
              <TransferFund/>
            </Route>

            <Route exact path="/addtransaction">
              <AddTransaction/>
            </Route>

            <Route exact path="/listusers">
              <UserList/>
            </Route>

            <Route exact path="/edituser/:username">
              <EditUser/>
            </Route>

            <Route exact path="/user/:userName">
              <UserInfo/>
            </Route>
            <Route exact path="/adminlogin">
              <AdminLogin/>
            </Route>

            <Route exact path="/edittransactionmenu">
              <EditTransactionMenu/>
            </Route>

            <Route exact path="/policy">
              <Policy/>
            </Route>

            <Route exact path="/transactionhistory">
              <TransactionHistory/>
            </Route>

            <Route exact path="/coininfo/:coin">
              <CoinInfo/>
            </Route>

            <Route exact path="/company">
              <Company/>
            </Route>

            <Route exact path="/database">
              <DatabaseQuery/>
            </Route>

          </Switch>
        </div>
      </ThemeProvider>
    </Router>
  );
}

export default App;
