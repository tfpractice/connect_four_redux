import React from 'react';
import Grid from 'material-ui/Grid';
import Users from './users';

const Main = ({ users, }) => (
      <Grid container direction="column" justify="center" align="center" className="App">
        <Grid item xs={11}>
          <h2>Welcome to Connect Four Redux</h2>
          <Users/>
          <p className="App-intro" />
        </Grid>
        </Grid >
    );

export default Main;
