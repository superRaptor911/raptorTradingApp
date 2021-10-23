import React from 'react';
import {BrowserRouter as Router, Route, Switch} from 'react-router-dom';
import Header from './components/Header';
import Home from './pages/Home';
import {ROUTES} from './routes';

function App() {
  return (
    <Router>
      <Header />
      <Switch>
        <Route exact path={ROUTES.home}>
          <Home />
        </Route>
      </Switch>
    </Router>
  );
}

export default App;
