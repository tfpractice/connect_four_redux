import React, { Component, } from 'react';
import { connect, } from 'react-redux';
import { Route, Switch, } from 'react-router-dom';
import Grid from 'material-ui/Grid';

import { LoginForm, Main, Nav, NoMatch, } from './components';

const mapStateToProps = ({ users, }) => ({ users, });

export class Routes extends Component {

  render () {
    return (
    <Grid container className="Game">
      <Nav/>
      <Grid container >
        <Grid item xs={11} >
          <Switch>
            <Route path="/" component={Main} />
            <Route component={NoMatch}/>
          </Switch>
        </Grid>
      </Grid>
    </Grid>
    );
  }
}

export default connect(mapStateToProps)(Routes);
