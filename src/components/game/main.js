import React, { Component, } from 'react';
import Grid from 'material-ui/Grid';
import Paper from 'material-ui/Paper';
import { Route, Switch, } from 'react-router-dom';
import { connect, } from 'react-redux';
import Board from './board';
import Button from 'material-ui/Button';
import { GameActs, } from '../../modules';
import { PlayerCard, } from '../player';

const stateToProps = state => ({ ...state, });

class Game extends Component {
  render() {
    const { start, game, } = this.props;

    console.log('game', game);
    console.log('game.players', game.players);
    return (
      <Grid container align="center" justify="center">
        <Grid item xs={11} className="GameGrid">
          <Button onClick={start}>Start game</Button>

        </Grid>
        <Grid item xs={11} className="players">
          {game.players.map((p, i) => (
            <PlayerCard key={i} player={p}/>
          ))}

        </Grid>
        <Grid item xs={11} className="GameGrid">
          <Board/>

        </Grid>
      </Grid>
    );
  }
}
export default connect(stateToProps, GameActs)(Game);
