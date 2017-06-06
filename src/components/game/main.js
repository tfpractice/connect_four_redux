import React, { Component, } from 'react';
import Grid from 'material-ui/Grid';
import Paper from 'material-ui/Paper';
import { Route, Switch, } from 'react-router-dom';
import { connect, } from 'react-redux';
import Board from './board';
import Button from 'material-ui/Button';
import { GameActs, } from '../../modules';

class Game extends Component {
  
  render() {
    const { start, } = this.props;

    return (
      <Grid container direction="column" justify="center" align="center" style={{ paddingTop: '5rem', }}>
        <Grid item xs={11} sm={10} className="homeDiv">
          <Button onClick={start}>Start game</Button>
          <Board/>
          
        </Grid>
      </Grid>
    );
  }
}
export default connect(null, GameActs)(Game);
