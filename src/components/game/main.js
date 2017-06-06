import React, { Component, } from 'react';
import Grid from 'material-ui/Grid';
import Paper from 'material-ui/Paper';
import { Route, Switch, } from 'react-router-dom';
import { connect, } from 'react-redux';
import Board from './board';

class Home extends Component {
  
  render() {
    return (
      <Grid container direction="column" justify="center" align="center" style={{ paddingTop: '5rem', }}>
        <Grid item xs={11} sm={10} className="homeDiv">
          this is the game section
          <Board/>
        </Grid>
      </Grid>
    );
  }
}
export default Home;
