import React from 'react';
import ReactDOM from 'react-dom';
import './index.css';
import App from './App';
import {registerSW} from 'virtual:pwa-register';
import {useRegisterSW} from 'virtual:pwa-register/react';

const intervalMS = 60 * 60 * 1000;

const updateServiceWorker = useRegisterSW({
  onRegistered(r) {
    r &&
      setInterval(() => {
        r.update();
      }, intervalMS);
  },
});

const updateSW = registerSW({
  onOfflineReady() {},
});

ReactDOM.render(
  <React.StrictMode>
    <App />
  </React.StrictMode>,
  document.getElementById('root'),
);
