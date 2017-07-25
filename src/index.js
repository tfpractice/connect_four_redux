import React from 'react';
import ReactDOM from 'react-dom';
import injectTapEventPlugin from 'react-tap-event-plugin';
import { MuiThemeProvider } from 'material-ui/styles';
import { BrowserRouter, Route } from 'react-router-dom';
import { Provider } from 'react-redux';
import {
  authHandler,
  connHandler,
  gameHandler,
  onlineHandler,
} from './handlers';

import Home from './components';
import getStore from './store';
import { styleManager, theme } from './utils';
import './index.css';

injectTapEventPlugin();
const store = getStore();

authHandler(store);
connHandler(store);
gameHandler(store);
onlineHandler(store);

ReactDOM.render(
  <Provider store={store}>
    <MuiThemeProvider theme={theme} styleManager={styleManager}>
      <BrowserRouter>
        <Route component={Home} />
      </BrowserRouter>
    </MuiThemeProvider>
  </Provider>,
  document.getElementById('root')
);
