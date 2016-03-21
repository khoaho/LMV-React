
import 'babel-polyfill';

import { syncHistoryWithStore } from 'react-router-redux'
import configureStore from 'store/configureStore';
import { browserHistory } from 'react-router'
import { Provider } from 'react-redux';
import { render } from 'react-dom';
import {env} from 'c0nfig';
import React from 'react';
import 'bootstrap';

import Root from 'Root/Root'
import App from 'App/App';

/////////////////////////////////////////////////////////////////////
// Bootstraping
//
/////////////////////////////////////////////////////////////////////
(function run() {

  console.log('Env: ' + env);

  const store = configureStore();
  const history = syncHistoryWithStore(browserHistory, store);

  render(
    <Root store={store} history={history}/>,
    document.getElementById('root')
  )
})();


