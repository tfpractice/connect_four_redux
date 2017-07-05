import React, { Component, } from 'react';
import { connect, } from 'react-redux';
import { Route, Switch, } from 'react-router-dom';
import Grid from 'material-ui/Grid';

import Nav from './nav';
import NoMatch from './noMatch';
import Info from './info';
import Game from './game';

// const styles = { marginTop: '5em', };

const mapStateToProps = ({ users, }) => ({ users, });

export class Main extends Component {
  render () {
    return (
      <Grid container justify="center" align="center" className="Game">
        <Grid item xs>
          <Nav/>

        </Grid>
        <Grid item xs={12} className="homeRoute" >
          <Switch>
            <Route path="/" component={Info} />
            <Route component={NoMatch}/>
          </Switch>

        </Grid>
        <Grid item xs>
          <Route component={Game} />

        </Grid>
      </Grid>
    );
  }
}

export default connect(mapStateToProps)(Main);
