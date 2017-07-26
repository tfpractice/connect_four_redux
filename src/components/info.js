import React from 'react';
import Grid from 'material-ui/Grid';

const Main = ({ users }) =>
  (<Grid container justify="center" align="center" className="infoGrid">
    <Grid item xs={11}>
      <h2>Welcome to Connect Four Redux</h2>
    </Grid>
  </Grid>);

export default Main;
