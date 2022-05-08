import {lazy, Suspense} from 'react';
import {BrowserRouter as Router, Route, Switch} from 'react-router-dom';
import Loading from './components/Loading';
import Home from './pages/Home';
import {ROUTES} from './routes';
import ReloadPrompt from './ReloadPrompt';
import ScrollToTop from 'react-router-scroll-top';
import {createTheme, ThemeProvider} from '@mui/material';

const Header = lazy(() => import('./components/Header'));
const Summary = lazy(() => import('./pages/Summary'));
const User = lazy(() => import('./pages/User'));
const CoinPage = lazy(() => import('./pages/Coin'));
const FundTransfer = lazy(() => import('./pages/FundTransfer'));
const AdminMenu = lazy(() => import('./pages/AdminMenu'));
const AdminLogin = lazy(() => import('./pages/AdminLogin'));
const AddTransations = lazy(() => import('./pages/AddTransactions'));
const Transactions = lazy(() => import('./pages/Transactions'));
const AddUser = lazy(() => import('./pages/AddUser'));
const AddCoin = lazy(() => import('./pages/AddCoin'));
const UserLogin = lazy(() => import('./pages/UserLogin'));
const WazirxDashboard = lazy(() => import('./pages/wazirx/WazirxDashboard'));
const Automation = lazy(() => import('./pages/wazirx/Automation'));
const StopLossBot = lazy(() => import('./pages/wazirx/StopLossBot'));
const Leaderboard = lazy(() => import('./pages/Leaderboard'));
const WazirxTradingMenuMobile = lazy(() =>
  import('./pages/wazirx/WazirxTradingMenuMobile'),
);

const theme = createTheme({
  components: {
    MuiTableContainer: {
      styleOverrides: {
        // Name of the slot
        root: {
          background: '#FFFFFF',
          boxShadow: '0px 4px 4px rgba(0, 0, 0, 0.25)',
          borderRadius: '25px',
        },
      },
    },

    MuiDrawer: {
      styleOverrides: {
        // Name of the slot
        paper: {
          background: '#1D1D1D',
          color: 'white',
        },
      },
    },
  },
});

function App() {
  return (
    <div style={{overflowX: 'hidden'}}>
      <Router>
        <ScrollToTop />
        <ThemeProvider theme={theme}>
          <Suspense fallback={<Loading />}>
            <Header />
          </Suspense>
          <Switch>
            <Route exact path={ROUTES.home}>
              <Home />
            </Route>

            <Suspense fallback={<Loading />}>
              <Route exact path={ROUTES.summary} component={Summary} />
              <Route exact path={ROUTES.user} component={User} />
              <Route exact path={ROUTES.coin} component={CoinPage} />
              <Route exact path={ROUTES.addTrans} component={AddTransations} />
              <Route
                exact
                path={ROUTES.fundTransfer}
                component={FundTransfer}
              />
              <Route exact path={ROUTES.adminMenu} component={AdminMenu} />
              <Route exact path={ROUTES.adminLogin} component={AdminLogin} />
              <Route
                exact
                path={ROUTES.transactions}
                component={Transactions}
              />
              <Route exact path={ROUTES.addUser} component={AddUser} />
              <Route exact path={ROUTES.addCoin} component={AddCoin} />
              <Route exact path={ROUTES.loginUser} component={UserLogin} />
              <Route exact path={ROUTES.automations} component={Automation} />
              <Route exact path={ROUTES.stopLossBot} component={StopLossBot} />
              <Route
                exact
                path={ROUTES.tradingMenu}
                component={WazirxDashboard}
              />
              <Route
                exact
                path={ROUTES.tradingMenuMobile}
                component={WazirxTradingMenuMobile}
              />
              <Route exact path={ROUTES.leaderboard} component={Leaderboard} />
            </Suspense>
          </Switch>
        </ThemeProvider>
      </Router>

      <ReloadPrompt />
    </div>
  );
}

export default App;
