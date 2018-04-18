import Grid from 'material-ui/Grid';
import React from 'react';
import { Route } from 'react-router-dom';

import Game from './game';
import Nav from './nav';

const Main = () => (
  <Grid container justify="center" alignContent="center" className="Game">
    <Grid item xs={12}>
      <Nav />
    </Grid>
    <Grid item xs={11} className="homeRoute">
      <Route component={Game} />
    </Grid>
  </Grid>
);

export default Main;
