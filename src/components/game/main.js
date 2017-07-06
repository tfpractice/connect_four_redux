import React, { Component, } from 'react';
import Grid from 'material-ui/Grid';
import { connect, } from 'react-redux';
import Board from './board';
import Button from 'material-ui/Button';
import { GameActs, } from '../../modules';
import { PlayerCard, } from '../player';

const stateToProps = state => ({ ...state, });

class Game extends Component {
  render() {
    const { start, game, resetGame, } = this.props;

    return (
      <Grid container align="center" justify="center">
        <Grid item xs={11} className="GameGrid">
          <Button onClick={start}>Start game</Button>
          <Button onClick={() => resetGame(game)}>Reset game</Button>
          
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
