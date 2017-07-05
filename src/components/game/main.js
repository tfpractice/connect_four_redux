import React, { Component, } from 'react';
import Grid from 'material-ui/Grid';
import Paper from 'material-ui/Paper';
import { Route, Switch, } from 'react-router-dom';
import { connect, } from 'react-redux';
import Board from './board';
import Button from 'material-ui/Button';
import { GameActs, } from '../../modules';

// import {, } from '../player';
import Players from './players';

const stateToProps = state => ({ ...state, });

class Game extends Component {
  render() {
    const { start, game, } = this.props;
    
    return (
      <Grid container align="center" justify="center">
        <Grid item xs={11} className="GameGrid">
          <Button onClick={start}>New  game</Button>

        </Grid>
        <Grid item xs={11} className="players">
          <Players players={game.players}/>
        </Grid>

        <Grid item xs={9} className="GameGrid">
          <Board/>
        </Grid>
      </Grid>
    );
  }
}
export default connect(stateToProps, GameActs)(Game);
