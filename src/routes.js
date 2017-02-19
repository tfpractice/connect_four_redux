import React from 'react';
import { connect, } from 'react-redux';
import { BrowserRouter, Link, Match, Miss, } from 'react-router';
import MuiThemeProvider from 'material-ui/styles/MuiThemeProvider';
import getMuiTheme from 'material-ui/styles/getMuiTheme';
import darkBaseTheme from 'material-ui/styles/baseThemes/darkBaseTheme';
import FlatButton from 'material-ui/FlatButton';
import AppBar from 'material-ui/AppBar';
import { Main, NoMatch, } from './components';

const Routes = () => (
<MuiThemeProvider muiTheme={getMuiTheme(darkBaseTheme, { userAgent: false, })}>
  <BrowserRouter>
    <div className="Game">
      <AppBar
        title={'Connect Four Redux'}
        iconClassNameRight="muidocs-icon-navigation-expand-more"
      />
      <div className="container">
        <Match pattern="/" component={Main} />
        <Miss component={NoMatch}/>
      </div>
    </div>
  </BrowserRouter>
</MuiThemeProvider>
);

export default connect()(Routes);
