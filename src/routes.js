import React, { Component, } from 'react';
import { connect, } from 'react-redux';
import { BrowserRouter, Link, Route, Switch, } from 'react-router-dom';
import MuiThemeProvider from 'material-ui/styles/MuiThemeProvider';
import getMuiTheme from 'material-ui/styles/getMuiTheme';
import darkBaseTheme from 'material-ui/styles/baseThemes/darkBaseTheme';
import FlatButton from 'material-ui/FlatButton';
import AppBar from 'material-ui/AppBar';
import { Main, NoMatch, } from './components';
import { AuthActs, } from './modules';

import { LoginForm, } from './components';
import { connRef, fireApp, } from './utils/firebase';

const mapStateToProps = ({ users, }) => ({ users, });

export class Routes extends Component {
  // ComponentDidMount() {
  //   const { dispatch, } = this.props;
  //
  //   console.log(dispatch(AuthActs.addUser('3')));
  //   console.log(this.props);
  //   connRef.on('value', (snapshot) => {
  //     if (snapshot.val()) {
  //       console.log('connection val');
  //       dispatch(AuthActs.addUser('3'));
  //       fireApp.auth().signInAnonymously().catch();
  //     }
  //   });
  // }

  render () {
    console.log(this.props);
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
