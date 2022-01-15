import React, {lazy, Suspense} from 'react';
import {BrowserRouter as Router, Route, Switch} from 'react-router-dom';
import Header from './components/Header';
import Home from './pages/Home';
import {ROUTES} from './routes';

const Summary = lazy(() => import('./pages/Summary'));
const User = lazy(() => import('./pages/User'));
const CoinPage = lazy(() => import('./pages/Coin'));
const FundTransfer = lazy(() => import('./pages/FundTransfer'));
const AdminMenu = lazy(() => import('./pages/AdminMenu'));
const AdminLogin = lazy(() => import('./pages/AdminLogin'));
const AddTransations = lazy(() => import('./pages/AddTransations'));
const Transactions = lazy(() => import('./pages/Transactions'));
const AddUser = lazy(() => import('./pages/AddUser'));
const AddCoin = lazy(() => import('./pages/AddCoin'));
const UserLogin = lazy(() => import('./pages/UserLogin'));
const WazirxDashboard = lazy(() => import('./pages/wazirx/WazirxDashboard'));
const Automation = lazy(() => import('./pages/wazirx/Automation'));
const StopLossBot = lazy(() => import('./pages/wazirx/StopLossBot'));
const WazirxTradingMenuMobile = lazy(() =>
  import('./pages/wazirx/WazirxTradingMenuMobile'),
);

function App() {
  return (
    <div style={{overflowX: 'hidden'}}>
      <Router>
        <Header />
        <Switch>
          <Route exact path={ROUTES.home}>
            <Home />
          </Route>

          <Suspense fallback={<div>Loading...</div>}>
            <Route exact path={ROUTES.summary} component={Summary} />
            <Route exact path={ROUTES.user} component={User} />
            <Route exact path={ROUTES.coin} component={CoinPage} />
            <Route exact path={ROUTES.addTrans} component={AddTransations} />
            <Route exact path={ROUTES.fundTransfer} component={FundTransfer} />
            <Route exact path={ROUTES.adminMenu} component={AdminMenu} />
            <Route exact path={ROUTES.adminLogin} component={AdminLogin} />
            <Route exact path={ROUTES.transactions} component={Transactions} />
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
          </Suspense>
        </Switch>
      </Router>
    </div>
  );
}

export default App;
