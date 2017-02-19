import React from 'react';
import ReactDOM from 'react-dom';
import { Provider, } from 'react-redux';
import { Main, } from './components';
import getStore from './store';
import injectTapEventPlugin from 'react-tap-event-plugin';
import App from './container';
import Routes from './routes';
import './index.css';
injectTapEventPlugin();

ReactDOM.render(
  <Main />,
  document.getElementById('root')
);

//
// ReactDOM.render(
//   <Provider store={getStore()}>
//     <Routes />
//   </Provider>, document.getElementById('root')
// );
