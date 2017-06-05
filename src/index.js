import React from 'react';
import ReactDOM from 'react-dom';
import { MuiThemeProvider, } from 'material-ui/styles';

import { Provider, } from 'react-redux';
import getStore from './store';
import injectTapEventPlugin from 'react-tap-event-plugin';
import { authHandler, connHandler, onlineHandler, } from './handlers';
import './index.css';
import Routes from './routes';
import { styleManager, theme, } from './utils';

injectTapEventPlugin();
const store = getStore();

connHandler(store);
onlineHandler(store);

ReactDOM.render(
  <Provider store={store}>
    <MuiThemeProvider theme={theme} styleManager={styleManager}>
      <Routes />
    </MuiThemeProvider>
    </Provider>, document.getElementById('root')
);
