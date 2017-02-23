import React from 'react';
import ReactDOM from 'react-dom';
import { Provider, } from 'react-redux';
import getStore from './store';
import injectTapEventPlugin from 'react-tap-event-plugin';
import { authHandler, connHandler, onlineHandler, } from './handlers';
import './index.css';
import Routes from './routes';

injectTapEventPlugin();
const store = getStore();

//
// connHandler(store);
onlineHandler(store);

ReactDOM.render(
  <Provider store={store}>
    <Routes />
  </Provider>, document.getElementById('root')
);
