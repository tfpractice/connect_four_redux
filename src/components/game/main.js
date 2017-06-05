import React, { Component, } from 'react';
import Grid from 'material-ui/Grid';
import Paper from 'material-ui/Paper';
import { Route, Switch, } from 'react-router-dom';
import { connect, } from 'react-redux';
import Board from './board';

//
// import About from './about';
// import Teaching from './teaching';
// import Nav from './nav';

// const { containers: { WithAll, }, actions: pActions, } = Projects;

class Home extends Component {
  // componentWillReceiveProps({ setProjects, projectsArray, projectsData, }) {
  //   !projectsData.loading && setProjects(projectsArray);
  // }
  
  render() {
    return (
      <Grid container direction="column" justify="center" align="center" style={{ paddingTop: '5rem', }}>
        <Grid item xs={11} sm={10} className="homeDiv">
          <Paper>
            this is the game section
            <Board/>
          </Paper>
        </Grid>
      </Grid>
    );
  }
}
export default Home;
