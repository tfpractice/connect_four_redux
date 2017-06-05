import React from 'react';
import ReactDOM from 'react-dom';
import { MuiThemeProvider, } from 'material-ui/styles';

import { Provider, } from 'react-redux';
import getStore from './store';
import injectTapEventPlugin from 'react-tap-event-plugin';
import { authHandler, connHandler, onlineHandler, } from './handlers';
import './index.css';
import Routes from './routes';
import { Home, } from './components';
import { styleManager, theme, } from './utils';
import { BrowserRouter, Link, Route, Switch, } from 'react-router-dom';

injectTapEventPlugin();
const store = getStore();

connHandler(store);
onlineHandler(store);

ReactDOM.render(
  <Provider store={store}>
    <MuiThemeProvider theme={theme} styleManager={styleManager}>
      <BrowserRouter>
        <Route component={Home} />
      </BrowserRouter>
    </MuiThemeProvider>
    </Provider>, document.getElementById('root')
);
