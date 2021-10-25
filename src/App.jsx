import React from 'react';
import {BrowserRouter as Router, Route, Switch} from 'react-router-dom';
import Header from './components/Header';
import Home from './pages/Home';
import Summary from './pages/Summary';
import User from './pages/User';
import {ROUTES} from './routes';

function App() {
  return (
    <div style={{overflowX: 'hidden'}}>
      <Router>
        <Header />
        <Switch>
          <Route exact path={ROUTES.home}>
            <Home />
          </Route>

          <Route exact path={ROUTES.summary}>
            <Summary />
          </Route>

          <Route exact path={ROUTES.user}>
            <User />
          </Route>
        </Switch>
      </Router>
    </div>
  );
}

export default App;
