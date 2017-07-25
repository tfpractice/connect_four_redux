import React, { Component } from 'react';
import { connect } from 'react-redux';
import { Route, Switch } from 'react-router-dom';
import Grid from 'material-ui/Grid';

import Nav from './nav';

import Game from './game';

const mainStyle = { marginTop: '5rem' };
const mapStateToProps = ({ users }) => ({ users });

class Main extends Component {
  render() {
    return (
      <Grid container justify="center" align="center" className="Game">
        <Grid item xs={12}>
          <Nav />
        </Grid>
        <Grid item xs={11} style={mainStyle} className="homeRoute">
          <Route component={Game} />
        </Grid>
      </Grid>
    );
  }
}

export default connect(mapStateToProps)(Main);
