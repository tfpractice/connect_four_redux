import React, { Component, } from 'react';
import { connect, } from 'react-redux';
import { Route, Switch, } from 'react-router-dom';
import Grid from 'material-ui/Grid';
import Nav from './nav';
import NoMatch from './noMatch';
import Info from './info';
import Game from './game';
const mapStateToProps = ({ users, }) => ({ users, });

export class Main extends Component {

  render () {
    return (
    <Grid container className="Game">
      <Nav/>
      <Grid container >
        <Grid item xs={11} >
          <Switch>
            <Route path="/" component={Info} />
            <Route component={NoMatch}/>
          </Switch>
          <Route path="/" component={Game} />

        </Grid>
      </Grid>
    </Grid>
    );
  }
}

export default connect(mapStateToProps)(Main);
