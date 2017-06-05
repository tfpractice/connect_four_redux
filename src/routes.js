import React, { Component, } from 'react';
import { connect, } from 'react-redux';
import { BrowserRouter, Link, Route, Switch, } from 'react-router-dom';
import MuiThemeProvider from 'material-ui/styles/MuiThemeProvider';
import getMuiTheme from 'material-ui/styles/getMuiTheme';
import darkBaseTheme from 'material-ui/styles/baseThemes/darkBaseTheme';
import AppBar from 'material-ui/AppBar';
import { LoginForm, Main, NoMatch, } from './components';

const mapStateToProps = ({ users, }) => ({ users, });

export class Routes extends Component {

  render () {
    return (
<MuiThemeProvider muiTheme={getMuiTheme(darkBaseTheme, { userAgent: false, })}>
  <BrowserRouter>
    <div className="Game">
      <AppBar
        title={'Connect Four Redux'}
        iconClassNameRight="muidocs-icon-navigation-expand-more"
      />
      <LoginForm formID={'mainLogin'}/>
      <div className="container">
        <Switch>
          <Route path="/" component={Main} />
          <Route component={NoMatch}/>
        </Switch>
      </div>
    </div>
  </BrowserRouter>
</MuiThemeProvider>
    );
  }
}

export default connect(mapStateToProps)(Routes);
