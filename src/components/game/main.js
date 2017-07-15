import React, { Component, } from 'react';
import Grid from 'material-ui/Grid';
import { connect, } from 'react-redux';
import Button from 'material-ui/Button';
import Card, { CardActions, CardContent, CardHeader, } from 'material-ui/Card';

import { GameActs, } from '../../modules';
import { PlayerCard, } from '../player';
import Board from './board';

const stateToProps = state => ({ ...state, });

class Game extends Component {
  render() {
    const { start, game, resetGame, clearGame, } = this.props;
    
    return (
      <Grid container align="center" justify="center">
        <Grid item xs={11} className="GameGrid">
          <Card>
            <CardHeader title={`in play?${game.inPlay}`}/>
            <CardContent>
              <Grid container align="center" justify="center">
                {game.players.map((p, i) => (
                  <Grid item xs sm={6} key={p.id}>
                    <PlayerCard player={p}/>
                  </Grid>
                ))}
              </Grid>
            </CardContent>
            <CardActions>
              <Button onClick={start}>Start game</Button>
              <Button onClick={clearGame}>clearGame game</Button>
              <Button onClick={() => resetGame(game)}>Reset game</Button>

            </CardActions>
          </Card>
        </Grid>

        <Grid item xs={11} className="GameGrid">
          <Board/>

        </Grid>
      </Grid>
    );
  }
}
export default connect(stateToProps, GameActs)(Game);
