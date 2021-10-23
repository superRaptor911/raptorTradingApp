import React from 'react';
import {BrowserRouter as Router, Route, Switch} from 'react-router-dom';
import Home from './pages/Home';
import {ROUTES} from './routes';

function App() {
  return (
    <Router>
      <Switch>
        <Route exact path={ROUTES.home}>
          <Home />
        </Route>
      </Switch>
    </Router>
  );
}

export default App;
