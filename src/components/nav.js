import AppBar from 'material-ui/AppBar';
import Grid from 'material-ui/Grid';
import React from 'react';
import Text from 'material-ui/Typography';
import Toolbar from 'material-ui/Toolbar';
import { Link } from 'react-router-dom';

import { LoginForm } from './auth';

const Nav = props => (
  <AppBar>
    <Toolbar>
      <Grid container justify="space-between" alignContent="center">
        <Grid item>
          <Link to="/">
            <Text type="headline" color="secondary">
              Connect Four Redux
            </Text>
          </Link>
        </Grid>
        <Grid item>
          <LoginForm formID="mainLogin" />
        </Grid>
      </Grid>
    </Toolbar>
  </AppBar>
);

export default Nav;
