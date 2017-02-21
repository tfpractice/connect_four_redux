import React from 'react';
import ReactDOM from 'react-dom';
import { Provider, } from 'react-redux';
import { Main, } from './components';
import getStore from './store';
import injectTapEventPlugin from 'react-tap-event-plugin';
import { connRef, fireApp, } from './modules/fire';
import { connHandler, onlineHandler, } from './handlers';

import Routes from './routes';
import './index.css';
injectTapEventPlugin();

const store = getStore();

connHandler(store);
onlineHandler(store);

ReactDOM.render(
  <Provider store={store}>
    <Routes />
  </Provider>, document.getElementById('root')
);
