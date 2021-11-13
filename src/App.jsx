import React, {lazy, Suspense} from 'react';
import {BrowserRouter as Router, Route, Switch} from 'react-router-dom';
import Header from './components/Header';
import Home from './pages/Home';
import {ROUTES} from './routes';

const Summary = lazy(() => import('./pages/Summary'));
const User = lazy(() => import('./pages/User'));
const FundTransfer = lazy(() => import('./pages/FundTransfer'));
const AdminMenu = lazy(() => import('./pages/AdminMenu'));
const AdminLogin = lazy(() => import('./pages/AdminLogin'));
const AddTransations = lazy(() => import('./pages/AddTransations'));

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
            <Route exact path={ROUTES.addTrans} component={AddTransations} />
            <Route exact path={ROUTES.fundTransfer} component={FundTransfer} />
            <Route exact path={ROUTES.adminMenu} component={AdminMenu} />
            <Route exact path={ROUTES.adminLogin} component={AdminLogin} />
          </Suspense>
        </Switch>
      </Router>
    </div>
  );
}

export default App;
